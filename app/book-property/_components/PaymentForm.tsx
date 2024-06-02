import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import useBookProperty from "@/hooks/useBookProperty"
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import getLocation from "@/app/utils/getLocation"
import { Calendar, MoveRight } from "lucide-react"
import { differenceInCalendarDays } from "date-fns"

interface PaymentFormProps {
  clientSecret: string
  handleSetPaymentSuccess: (value: boolean) => void
}
const PaymentForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: PaymentFormProps) => {
  const { BookingData, resetBookingData } = useBookProperty()
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { getCountryByCode, getStateByCode } = getLocation()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!clientSecret) {
      return
    }
    if (!stripe) {
      return
    }
    handleSetPaymentSuccess(false)
    setIsLoading(false)
  }, [stripe])

  if (!BookingData?.startDate || !BookingData?.endDate) {
    return <div>Error: Missing reservation dates...</div>
  }
  const startDate = moment(BookingData?.startDate).format("YYYY-MM-DD")
  const endDate = moment(BookingData?.endDate).format("YYYY-MM-DD")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      return
    }
    try {
      stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
        })
        .then((result) => {
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent?.id}`)
              .then((res) => {
                toast({
                  variant: "success",
                  description: "Booking created successfully",
                })
                router.refresh()
                resetBookingData()
                handleSetPaymentSuccess(true)
                setIsLoading(false)
                router.push("/dashboard/acquired-bookings")
              })
              .catch((err) => {
                console.log(err)
                toast({
                  variant: "destructive",
                  description: "Something went wrong",
                })
                setIsLoading(false)
              })
          } else {
            setIsLoading(false)
          }
        })
    } catch (error: any) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <div className="flex lg:flex-row flex-col justify-center gap-9">
      <form
        onSubmit={handleSubmit}
        id="payment-form"
        className="flex-1 mx-10 flex flex-col gap-4 "
      >
        <h2>Billing Address</h2>
        <AddressElement
          options={{
            mode: "billing",
          }}
        />
        <h2>Payment</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Processing..." : "Pay now"}
        </Button>
      </form>
      <div className="flex-1 mx-10">
        <div className="flex flex-row justify-center outline outline-1 outline-border p-5 rounded-lg shadow-lg">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="uppercase text-xl font-semibold mb-2">
                  {BookingData.property?.title}
                </h1>
                <h1 className="text-lg">
                  {BookingData.property.category} in{" "}
                  {getCountryByCode(BookingData.property.country)?.name}
                  {BookingData.property.state &&
                    `, ${
                      getStateByCode(
                        BookingData.property.country,
                        BookingData.property.state
                      )?.name
                    }`}
                  {BookingData.property.city &&
                    `, ${BookingData.property.city}`}
                </h1>
              </div>
              <Image
                src={BookingData.property.images.split(",")[0]}
                alt="Property Image"
                width={200}
                height={200}
              />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row gap-4">
              <Calendar />
              <div className="flex flex-row gap-4">
                <h1 className="text-lg">{startDate}</h1>
                <MoveRight />
                <h1 className="text-lg">{endDate}</h1>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p>
                  ${BookingData.property.price} x{" "}
                  {differenceInCalendarDays(endDate, startDate)} nights
                </p>
                <p>${BookingData.totalPrice}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Service fee</p>
                <p>$0</p>
              </div>
              <div className="flex flex-row justify-between font-semibold">
                <p>Total(USD)</p>
                <p>${BookingData.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm
