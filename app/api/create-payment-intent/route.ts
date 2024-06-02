import useBookProperty from "@/hooks/useBookProperty"
import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
})

export async function POST(request: Request) {
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { booking, payment_intent_id } = body

  const bookingData = {
    ...booking,
    userName: user.firstName,
    userEmail: user.primaryEmailAddress?.emailAddress,
    userId: user.id,
    paymentIntentId: payment_intent_id,
  }
  let foundBooking
  if (payment_intent_id) {
    foundBooking = await prismadb.booking.findUnique({
      where: {
        paymentIntentId: payment_intent_id,
        userId: user.id,
      },
    })
  }
  if (foundBooking && payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: booking.totalPrice * 100,
        }
      )
      const res = await prismadb.booking.update({
        where: {
          paymentIntentId: payment_intent_id,
          userId: user.id,
        },
        data: bookingData,
      })
      if (!res) {
        return NextResponse.error()
      }

      return NextResponse.json({ paymentIntent: updated_intent })
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingData.totalPrice * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    })

    bookingData.paymentIntentId = paymentIntent.id
    const newBooking = await prismadb.booking.create({
      data: bookingData,
    })
    return NextResponse.json({ paymentIntent })
  }
  return new NextResponse("Internal Server Error", { status: 500 })
}
