"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Booking, Property } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
//const router = useRouter()
export const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
  },
  {
    accessorKey: "bookedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booked At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("bookedAt"))
      return <div>{date.toDateString()}</div>
    },
  },
  {
    accessorKey: "checkInDate",
    header: "Check In",
    cell: ({ row }) => {
      const date = new Date(row.getValue("checkInDate"))
      return <div>{date.toDateString()}</div>
    },
  },
  {
    accessorKey: "checkOutDate",
    header: "Check Out",
    cell: ({ row }) => {
      const date = new Date(row.getValue("checkOutDate"))
      return <div>{date.toDateString()}</div>
    },
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus")
      if (status === true) {
        return (
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="font-medium">Paid</span>
          </div>
        )
      }
      return (
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          <span className="font-medium">Unpaid</span>
        </div>
      )
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
  //           <DropdownMenuItem>
  //             <Link href={`/dashboard/properties/${row.original.id}`}>
  //               Edit
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link href={`/dashboard/properties/${row.original.id}`}>
  //               Remove
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link href={`/dashboard/properties/${row.original.id}`}>
  //               Copy Link
  //             </Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
