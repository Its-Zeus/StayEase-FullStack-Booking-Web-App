"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

import "./styles.css"
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules"
import Image from "next/image"

interface CustomCSSProperties extends React.CSSProperties {
  "--swiper-navigation-size"?: string
  "--swiper-pagination-bullet-inactive-opacity"?: string
  "--swiper-pagination-bullet-size"?: string
}
const ImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className="mySwiper aspect-video"
      style={
        {
          "--swiper-navigation-size": "10px",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "7px",
        } as CustomCSSProperties
      }
    >
      {images.map((image, index) => (
        <SwiperSlide className="rounded-xl" key={index}>
          <div className="w-full h-full">
            <Image
              src={image}
              alt="Property Image"
              width={2000}
              height={1000}
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider
