import prismadb from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const propertyId = req.nextUrl.searchParams.get("propertyId")
  if (!propertyId) {
    return new Response("Property ID is required", { status: 400 })
  }

  try {
    const property = await prismadb.property.findUnique({
      where: {
        id: propertyId,
      },
    })
    return NextResponse.json(property)
  } catch (error) {
    return new Response("Internal Error", { status: 500 })
  }
}
