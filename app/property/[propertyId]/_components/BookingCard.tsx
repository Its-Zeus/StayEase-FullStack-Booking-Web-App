"use client"
import { Booking, Property } from "@prisma/client"
import React, { useEffect, useMemo, useState } from "react"
import { DatePickerWithRange } from "./DateRangePicker"
import { Button } from "@/components/ui/button"
import { CalendarCheck2, LoaderCircle } from "lucide-react"
import { DateRange } from "react-day-picker"
import { toast } from "@/components/ui/use-toast"
import useBookProperty from "@/hooks/useBookProperty"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"

interface BookingCardProps {
  property: Property
  bookings: Booking[]
}
const BookingCard = ({ property, bookings }: BookingCardProps) => {
  const [date, setDate] = useState<DateRange | undefined>()
  const [bookingLoading, setBookingLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [days, setDays] = useState(1)
  const { user } = useUser()
  const router = useRouter()
  const {
    setBookingData,
    PaymentIntentId,
    setClientSecret,
    setPaymentIntentId,
  } = useBookProperty()
  const HandleReserve = () => {
    if (!user?.id)
      return toast({
        variant: "destructive",
        description: "Please login first",
      })
    if (!property?.userid)
      return toast({
        variant: "destructive",
        description: "Something went wrong",
      })
    if (date?.from && date?.to) {
      setBookingLoading(true)
      const bookingPropertyData = {
        property,
        startDate: date.from,
        endDate: date.to,
        totalPrice,
      }
      setBookingData(bookingPropertyData)
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            hotelOwnerId: property.userid,
            propertyId: property.id,
            checkInDate: date.from,
            checkOutDate: date.to,
            totalPrice: totalPrice,
          },
          payment_intent_id: PaymentIntentId,
        }),
      })
        .then((res) => {
          setBookingLoading(false)
          if (res.status === 401) {
            return router.push("/sign-in")
          }
          return res.json()
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret)
          setPaymentIntentId(data.paymentIntent.id)
          router.push("/book-property")
        })
        .catch((error) => {
          console.log(error)
          toast({
            variant: "destructive",
            description: "Something went wrong",
          })
        })
    } else {
      toast({
        variant: "destructive",
        description: "Please select date",
      })
    }
  }
  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from)
      setDays(dayCount)
      if (dayCount && property && property.price) {
        setTotalPrice(dayCount * property.price)
      }
    }
  }, [date, property?.price])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    bookings?.forEach((booking) => {
      const range = eachDayOfInterval({
        start: new Date(booking.checkInDate),
        end: new Date(booking.checkOutDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [bookings])
  return (
    <div className="flex flex-col gap-5 outline outline-1 outline-border p-5 rounded-lg shadow-lg sticky top-20 right-5">
      <div>
        <p>
          <span className="text-2xl font-medium">${property?.price}</span>
          <span> /night</span>
        </p>
      </div>
      <DatePickerWithRange
        date={date}
        setDate={setDate}
        disabledDates={disabledDates}
      />
      <Button
        disabled={bookingLoading}
        className="font-medium text-lg"
        onClick={() => HandleReserve()}
      >
        {bookingLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CalendarCheck2 className="mr-2 h-4 w-4" />
        )}
        {bookingLoading ? "Reserving..." : "Reserve"}
      </Button>
      <p className="my-3 text-center">You won&apos;t be charged yet</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <p className="underline">
            ${property?.price}
            {` x ${days} night`}
          </p>
          <p>${totalPrice}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="underline">Service charge</p>
          <p>$0</p>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="flex flex-row justify-between font-bold">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  )
}

export default BookingCard
