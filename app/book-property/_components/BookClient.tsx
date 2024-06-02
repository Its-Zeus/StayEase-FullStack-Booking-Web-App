"use client"
import React, { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import useBookProperty from "@/hooks/useBookProperty"
import PaymentForm from "./PaymentForm"
import { useTheme } from "next-themes"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)
const BookClient = () => {
  const { BookingData, clientSecret } = useBookProperty()
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const { theme } = useTheme()

  const option: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  }

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(true)
  }
  return (
    <div className="max-w-[1320px] m-auto">
      {clientSecret && BookingData && (
        <div>
          <h1 className="text-xl my-10 mx-10">
            Complete the payment to confirm the booking
          </h1>
          <Elements stripe={stripePromise} options={option}>
            <PaymentForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default BookClient
