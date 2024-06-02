import prismadb from "@/lib/prismadb"
import { auth, getAuth } from "@clerk/nextjs/server"
import { Booking } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }
  try {
    const bookings = await prismadb.booking.findMany({
      where: {
        hotelOwnerId: userId,
      },
    })
    return NextResponse.json(bookings)
  } catch {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
