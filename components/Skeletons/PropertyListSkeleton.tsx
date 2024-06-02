import React from "react"
import PropertyItemSkeleton from "./PropertyItemSkeleton"

const PropertyListSkeleton = () => {
  const items = Array.from({ length: 20 }, (_, index) => index)
  return (
    <div className="grid 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-6">
      {items.map((item) => (
        <PropertyItemSkeleton key={item} />
      ))}
    </div>
  )
}

export default PropertyListSkeleton
