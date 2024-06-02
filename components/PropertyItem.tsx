import React from "react"
import type { Property } from "@prisma/client"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

import "./styles.css"

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules"
import Image from "next/image"
import getLocation from "@/app/utils/getLocation"
import Link from "next/link"
interface CustomCSSProperties extends React.CSSProperties {
  "--swiper-navigation-size"?: string
  "--swiper-pagination-bullet-inactive-opacity"?: string
  "--swiper-pagination-bullet-size"?: string
}
const PropertyItem = ({ property }: { property: Property }) => {
  const { getCountryByCode } = getLocation()
  return (
    <Link className="flex flex-col gap-3" href={`/property/${property.id}`}>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper max-h-[280px] aspect-square"
        style={
          {
            "--swiper-navigation-size": "10px",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-pagination-bullet-size": "7px",
          } as CustomCSSProperties
        }
      >
        {property.images.split(",").map((image, index) => (
          <SwiperSlide className="rounded-xl aspect-square" key={index}>
            <Image
              src={image}
              alt="Property Image"
              width={1000}
              height={1000}
              className="aspect-square"
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <h1 className="text-base font-semibold line-clamp-1">
          {property.category}
          {` - ${
            property.city
              ? property.city
              : getCountryByCode(property.country)?.name
          }`}
        </h1>
        <p className="text-sm line-clamp-2">{property.title}</p>
        <h1 className="text-base font-semibold mt-2">
          ${property.price} /night
        </h1>
      </div>
    </Link>
  )
}

export default PropertyItem
