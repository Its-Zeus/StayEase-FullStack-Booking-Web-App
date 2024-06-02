import prismadb from "@/lib/prismadb"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request)
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  try {
    const properties = await prismadb.property.findMany({
      where: {
        userid: userId,
      },
    })
    return NextResponse.json(properties)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
