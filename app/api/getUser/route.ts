import { clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userid = request.nextUrl.searchParams.get("userid")
  if (!userid) {
    return new NextResponse("userid is required", { status: 400 })
  }

  try {
    const res = await clerkClient.users.getUser(userid)
    const createdAtDate = new Date(res.createdAt)
    const now = new Date()
    const timeDifference = now.getTime() - createdAtDate.getTime()
    const timeDifferenceInDays = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    )
    const timeDifferenceInHours =
      Math.floor(timeDifference / (1000 * 60 * 60)) % 24
    const timeDifferenceInMinutes =
      Math.floor(timeDifference / (1000 * 60)) % 60
    const createdAtDateString = createdAtDate.toISOString().split("T")[0]
    const extendedResponse = {
      ...res,
      createdAtDate: createdAtDateString,
      timeSinceCreation: `${timeDifferenceInDays} days`,
    }
    return NextResponse.json(extendedResponse)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
