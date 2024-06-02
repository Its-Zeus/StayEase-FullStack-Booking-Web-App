import prismadb from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

// export async function GET(req: NextRequest) {
//   const page = parseInt(req.nextUrl.searchParams.get("page") || "1") || 1
//   const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10") || 10
//   console.log(page, limit)

//   try {
//     const properties = await prismadb.property.findMany({
//       skip: (page - 1) * limit,
//       take: limit,
//     })

//     return NextResponse.json(properties)
//   } catch (error) {
//     console.log(error)

//     return new NextResponse("Internal Error", { status: 500 })
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { page, limit, searchParams } = await req.json()

    // Default values and validation
    const pageNum = page && Number.isInteger(page) && page > 0 ? page : 1
    const limitNum = limit && Number.isInteger(limit) && limit > 0 ? limit : 10

    const { title, country, state, city } = searchParams || {}

    // Fetch properties with optional filters
    const properties = await prismadb.property.findMany({
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      where: {
        ...(title && { title: { contains: title } }),
        ...(country && { country }),
        ...(state && { state }),
        ...(city && { city }),
      },
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
