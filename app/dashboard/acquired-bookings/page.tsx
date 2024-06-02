"use client"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import type { Booking, Property } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"

const Page = () => {
  const { user } = useUser()
  const [acquiredBookings, setAcquiredBookings] = useState<Booking[]>([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/acquiredBookings")
        setAcquiredBookings(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookings()
  }, [user])

  return (
    <div>
      <div className="flex justify-between my-5 ">
        <h1 className="font-bold md:text-2xl text-xl">
          Your Acquired Bookings
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={acquiredBookings}
        setProperties={setAcquiredBookings}
      />
    </div>
  )
}

export default Page
