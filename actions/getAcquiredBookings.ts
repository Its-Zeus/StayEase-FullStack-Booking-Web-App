import prismadb from "@/lib/prismadb"

const getAcquiredBookings = async (userid: string) => {
  try {
    const bookings = await prismadb.booking.findMany({
      where: {
        userId: userid,
      },
    })
    return bookings
  } catch {
    throw new Error("Failed to get bookings")
  }
}

export default getAcquiredBookings
