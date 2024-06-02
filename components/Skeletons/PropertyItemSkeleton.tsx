import React from "react"
import { Skeleton } from "../ui/skeleton"

const PropertyItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Skeleton className="w-full h-auto rounded-xl aspect-square" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-2/3 h-[20px] rounded-full" />
        <Skeleton className="w-1/2 h-[20px] rounded-full" />
        <Skeleton className="w-1/3 h-[20px] rounded-full" />
      </div>
    </div>
  )
}

export default PropertyItemSkeleton
