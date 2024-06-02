import React, { useEffect, useState } from "react"
import type { Property } from "@prisma/client"
import ImageSlider from "./_components/ImageSlider"
import useBookProperty from "@/hooks/useBookProperty"
import PropertyDetails from "./_components/PropertyDetails"
import BookingCard from "./_components/BookingCard"
import getPoperty from "@/actions/getProperty"
import getUserInfos from "@/actions/getUserInfos"
import { getBookings } from "@/actions/getBookings"

const page = async ({ params }: { params: { propertyId: string } }) => {
  //const [property, setProperty] = useState<Property | null>(null)
  //const [images, setImages] = useState<string[]>([])
  //const [userInfos, setUserInfos] = useState<any>(null)

  const property = await getPoperty(params.propertyId)
  if (!property) {
    return <div>Property not found</div>
  }
  const userInfos = await getUserInfos(property?.userid)
  const images: string[] = property?.images.split(",")
  const bookings = await getBookings(params.propertyId)

  return (
    property && (
      <div className="max-w-[1320px] m-auto">
        <h1 className="capitalize text-2xl font-medium py-5 ml-3">
          {property?.title}
        </h1>
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="xl:w-2/3 lg:w-[60%] w-[90%] ">
            <ImageSlider images={property?.images.split(",")} />
            {property && (
              <PropertyDetails property={property} userInfos={userInfos} />
            )}
          </div>
          <div className="xl:w-1/3 max-w-[720px] relative">
            <BookingCard property={property} bookings={bookings} />
          </div>
        </div>
      </div>
    )
  )
}

export default page
