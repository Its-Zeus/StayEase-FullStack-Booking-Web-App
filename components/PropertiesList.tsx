import React from "react"
import type { Property } from "@prisma/client"
import PropertyItem from "./PropertyItem"

const PropertiesList = ({ properties }: { properties: Property[] }) => {
  return (
    <div className="grid 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-6">
      {properties.map((property, index) => (
        <PropertyItem key={index} property={property} />
      ))}
    </div>
  )
}

export default PropertiesList
