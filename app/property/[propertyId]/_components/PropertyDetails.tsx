import getLocation from "@/app/utils/getLocation"
import { Separator } from "@/components/ui/separator"
import { Property } from "@prisma/client"
import {
  Bath,
  CigaretteOff,
  CircleParking,
  Dumbbell,
  HandPlatter,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react"
import Image from "next/image"
import React from "react"

interface PropertyDetailsProps {
  property: Property
  userInfos?: any
}
const PropertyDetails = ({ property, userInfos }: PropertyDetailsProps) => {
  const { getCountryByCode, getStateByCode } = getLocation()
  return (
    <div className="mt-10 px-4">
      <h1 className="text-2xl font-medium">
        {property.category} in {getCountryByCode(property.country)?.name}
        {property.state &&
          `, ${getStateByCode(property.country, property.state)?.name}`}
        {property.city && `, ${property.city}`}
      </h1>
      <p className="text-lg">{`${property.guests}  guests - ${property.Bedrooms} bedrooms - ${property.Beds} beds`}</p>
      {userInfos && (
        <div className="flex flex-row gap-5 my-6">
          <Image
            src={userInfos.imageUrl}
            width={80}
            height={80}
            alt="User Image"
            className="rounded-full aspect-square w-16 h-16"
          />
          <div className="flex flex-col">
            <p className="text-lg font-medium">{`Hosted by ${userInfos?.firstName} ${userInfos?.lastName}`}</p>
            <p>Hosting since {`${userInfos?.createdAtDate}`}</p>
          </div>
        </div>
      )}
      <Separator />
      <h1 className="text-2xl font-medium my-5">About this place</h1>
      <p className="text-lg">{property.description}</p>
      <h1 className="text-2xl font-medium my-5">What this place offers</h1>
      <div className="grid grid-cols-2 gap-3">
        {property.freeWifi && (
          <div className="flex flex-row items-center gap-2">
            <Wifi className="h-5 w-5" />
            <p className="text-lg">Free Wifi</p>
          </div>
        )}
        {property.gym && (
          <div className="flex flex-row items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            <p className="text-lg">Gym</p>
          </div>
        )}
        {property.publicPool && (
          <div className="flex flex-row items-center gap-2">
            <Waves className="h-5 w-5" />
            <p className="text-lg">Public Pool</p>
          </div>
        )}
        {property.restaurant && (
          <div className="flex flex-row items-center gap-2">
            <Utensils className="h-5 w-5" />
            <p className="text-lg">Restaurant</p>
          </div>
        )}
        {property.parking && (
          <div className="flex flex-row items-center gap-2">
            <CircleParking className="h-5 w-5" />
            <p className="text-lg">Parking</p>
          </div>
        )}
        {property.noSmoking && (
          <div className="flex flex-row items-center gap-2">
            <CigaretteOff className="h-5 w-5" />
            <p className="text-lg">No Smoking</p>
          </div>
        )}
        {property.bathtub && (
          <div className="flex flex-row items-center gap-2">
            <Bath className="h-5 w-5" />
            <p className="text-lg">Bathtub</p>
          </div>
        )}
        {property.roomServices && (
          <div className="flex flex-row items-center gap-2">
            <HandPlatter className="h-5 w-5" />
            <p className="text-lg">Room Services</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyDetails
