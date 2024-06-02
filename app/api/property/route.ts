import prismadb from "@/lib/prismadb"
import { useAuth } from "@clerk/nextjs"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId } = getAuth(req)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const property = await prismadb.property.create({
      data: {
        ...body,
        userid: userId,
      },
    })

    return NextResponse.json(property)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
