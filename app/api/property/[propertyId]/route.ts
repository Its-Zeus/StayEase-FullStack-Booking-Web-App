import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const body = await req.json()
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.propertyId) {
      return new NextResponse("Property Id is required", { status: 400 })
    }

    const property = await prismadb.property.update({
      where: {
        id: params.propertyId,
      },
      data: {
        ...body,
      },
    })
    return NextResponse.json(property)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
