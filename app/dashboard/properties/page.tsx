"use client"
import prismadb from "@/lib/prismadb"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import React, { useEffect } from "react"
import type { Property } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useRouter } from "next/navigation"

const Page = () => {
  const [properties, setProperties] = React.useState<Property[]>([])
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/userproperties")
        setProperties(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProperties()
  }, [user])
  return (
    <div>
      <div className="flex justify-between my-5 ">
        <h1 className="font-bold md:text-2xl text-xl">Your Listings</h1>
        <button
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded"
          onClick={() => router.push("/dashboard/properties/new")}
        >
          Add Listing
        </button>
      </div>
      <DataTable
        columns={columns}
        data={properties}
        setProperties={setProperties}
      />
    </div>
  )
}

export default Page
