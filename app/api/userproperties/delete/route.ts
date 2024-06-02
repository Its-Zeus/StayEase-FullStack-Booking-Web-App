import prismadb from "@/lib/prismadb"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request)
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const ids = await request.json()
  try {
    const properties = await prismadb.property.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
    const newProperties = await prismadb.property.findMany()
    return NextResponse.json(newProperties)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
