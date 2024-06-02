import prismadb from "@/lib/prismadb"

export const getBookings = async (propertyId: string) => {
  try {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const bookings = await prismadb.booking.findMany({
      where: {
        checkOutDate: {
          gt: yesterday,
        },
        propertyId,
      },
    })
    return bookings
  } catch (error) {
    throw new Error("Failed to get bookings", { cause: error })
  }
}
