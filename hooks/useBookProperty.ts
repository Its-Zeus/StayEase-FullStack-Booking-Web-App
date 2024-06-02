import { Property } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BookPropertyStore {
  BookingData: BookingDataType | null
  PaymentIntentId: string | null
  clientSecret: string | undefined
  setBookingData: (data: BookingDataType) => void
  setPaymentIntentId: (PaymentIntentId: string) => void
  setClientSecret: (clientSecret: string) => void
  resetBookingData: () => void
}

type BookingDataType = {
  property: Property
  startDate: Date
  endDate: Date
  totalPrice: number
}

const useBookProperty = create<BookPropertyStore>()(
  persist(
    (set) => ({
      BookingData: null,
      PaymentIntentId: null,
      clientSecret: undefined,
      setBookingData: (data: BookingDataType) => set({ BookingData: data }),
      setPaymentIntentId: (PaymentIntentId: string) =>
        set({ PaymentIntentId: PaymentIntentId }),
      setClientSecret: (clientSecret: string) =>
        set({ clientSecret: clientSecret }),
      resetBookingData: () =>
        set({
          BookingData: null,
          PaymentIntentId: null,
          clientSecret: undefined,
        }),
    }),
    { name: "bookProperty" }
  )
)

export default useBookProperty
