import { getHotelById } from "@/actions/getHotelById"
import AddPropertyForm from "@/components/AddPropertyForm"
import { useAuth, useUser } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import React from "react"

interface Props {
  params: {
    propretyId: string
  }
}

const page = async ({ params }: Props) => {
  const hotel = await getHotelById(params.propretyId)
  const { userId } = auth()
  if (!userId) return <div>Not Authenticated...</div>
  if (hotel && hotel.userid !== userId) return <div>Access Denied...</div>
  //const { userId } = useAuth()
  //console.log(userId)
  return (
    <div className="max-w[1920px] w-full mx-auto xl:px-20 py-4 px-4">
      <AddPropertyForm property={hotel} />
    </div>
  )
}

export default page
