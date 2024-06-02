"use client"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import type { Booking, Property } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"

const Page = () => {
  const { user } = useUser()
  const [hostedBookings, setHostedBookings] = useState<Booking[]>([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/hostedBookings")
        setHostedBookings(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookings()
  }, [user])

  return (
    <div>
      <div className="flex justify-between my-5 ">
        <h1 className="font-bold md:text-2xl text-xl">Your Hosted Bookings</h1>
      </div>
      <DataTable
        columns={columns}
        data={hostedBookings}
        setProperties={setHostedBookings}
      />
    </div>
  )
}

export default Page
