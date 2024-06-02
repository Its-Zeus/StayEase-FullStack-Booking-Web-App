"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { Property } from "@prisma/client"
import InfiniteScroll from "react-infinite-scroll-component"
import PropertiesList from "@/components/PropertiesList"
import Container from "@/components/Container"
import PropertyListSkeleton from "@/components/Skeletons/PropertyListSkeleton"
import { LoaderCircle } from "lucide-react"
import { getProperties } from "@/actions/getProperties"
import SearchInput from "@/components/SearchInput"
import Filters from "@/components/Filters"

interface Props {
  searchParams: {
    title: string
    country: string
    state: string
    city: string
  }
}
export default function Home({ searchParams }: Props) {
  const [properties, setProperties] = useState<Property[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    fetchPropertiez()
  }, [searchParams])
  useEffect(() => {
    if (page > 1) {
      fetchPropertiess()
    }
  }, [page])
  const fetchProperties = async () => {
    try {
      const res = await fetch(`/api/properties?page=${page}&limit=20`)
      const newProperties = await res.json()
      setProperties([...properties, ...newProperties])
      if (newProperties.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPropertiess = async () => {
    try {
      const res = await fetch(`/api/properties`, {
        method: "POST",
        body: JSON.stringify({
          page: page,
          limit: 20,
          searchParams,
        }),
      })
      const newProperties = await res.json()
      setProperties([...properties, ...newProperties])
      if (newProperties.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPropertiez = async () => {
    //setHasMore(true)
    try {
      const res = await fetch(`/api/properties`, {
        method: "POST",
        body: JSON.stringify({
          page: 1,
          limit: 20,
          searchParams,
        }),
      })
      const newProperties = await res.json()
      setProperties(newProperties)
      setHasMore(true)
      if (newProperties.length === 0) {
        setHasMore(false)
      }
      setPage(2)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1)
  }
  return (
    <Container>
      <div className="flex flex-col gap-5 my-10">
        <SearchInput />
        <Filters />
      </div>
      <div>
        <InfiniteScroll
          dataLength={properties.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center p-4">
              <LoaderCircle className="animate-spin h-10 w-10 " />
            </div>
            // <div>
            //   <PropertyListSkeleton />
            // </div>
          }
        >
          <PropertiesList properties={properties} />
        </InfiniteScroll>
      </div>
    </Container>
  )
}
