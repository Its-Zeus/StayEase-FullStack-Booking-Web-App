"use client"
import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { Search } from "lucide-react"

const SearchInput = () => {
  const [value, setValue] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  //   useEffect(() => {
  //     const query = {
  //       title: value,
  //     }
  //     const url = qs.stringifyUrl(
  //       {
  //         url: window.location.href,
  //         query,
  //       },
  //       {
  //         skipNull: true,
  //         skipEmptyString: true,
  //       }
  //     )
  //     router.push(url)
  //   }, [value, router])

  const handleSearch = () => {
    const query = {
      title: value,
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    router.push(url)
  }
  return (
    <div className="w-full max-w-[600px] mx-auto flex items-center gap-4">
      <div className="relative w-full">
        <Input
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
          className="h-14 rounded-full w-full px-4"
        />
        <div className="absolute h-[80%] aspect-square rounded-full  bg-primary right-2 top-1/2 transform -translate-y-1/2 hover:text-primary hover:bg-white">
          <Search
            role="button"
            onClick={handleSearch}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchInput
