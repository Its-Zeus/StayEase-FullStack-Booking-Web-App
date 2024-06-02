import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.Id) {
      return new NextResponse("Id is required", { status: 400 })
    }
    const booking = await prismadb.booking.update({
      where: {
        paymentIntentId: params.Id,
      },
      data: {
        paymentStatus: true,
      },
    })
    return NextResponse.json(booking)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { Id: string } }
// ) {
//   try {
//     const { userId } = auth()
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 })
//     }
//     if (!params.Id) {
//       return new NextResponse("Id is required", { status: 400 })
//     }
//     const booking = await prismadb.booking.delete({
//       where: {
//         paymentIntentId: params.Id,
//       },
//     })
//     return NextResponse.json(booking)
//   } catch (error) {
//     console.log(error)
//     return new NextResponse("Internal Error", { status: 500 })
//   }
// }
