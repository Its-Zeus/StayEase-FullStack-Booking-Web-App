import { Booking, Property } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BookPropertyStore {
  AcquiredBookings: Booking[] | null
  setAcquiredBookings: (data: Booking[]) => void
}

const useDashboard = create<BookPropertyStore>()(
  persist(
    (set) => ({
      AcquiredBookings: null,
      setAcquiredBookings: (data: Booking[]) => set({ AcquiredBookings: data }),
    }),
    { name: "useDashboard" }
  )
)

export default useDashboard
