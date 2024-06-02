"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "./ModeToogle"
import { useClerk, useUser } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarCheck, Hotel, LogOut, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "./ui/button"

const Navbarr = () => {
  const { user, isSignedIn } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const router = useRouter()
  const pathname = usePathname()
  return (
    <nav
      className={`flex flex-row justify-between py-4 xl:px-12 px-4 ${
        pathname.startsWith("/property/") ||
        pathname.startsWith("/book-property")
          ? "max-w-[1500px] m-auto"
          : ""
      }`}
    >
      <Link href="/">
        <h1 className="font-bold text-2xl">
          <span className="text-foreground">Stay</span>
          <span className="text-primary">Ease</span>
        </h1>
      </Link>
      <div className="flex flex-row items-center gap-6">
        <Link className="hidden md:block" href="/dashboard/properties/new">
          List your property
        </Link>
        <ModeToggle />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Image
                src={user?.imageUrl}
                alt="Profile"
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[370px] py-4 xl:mx-20 mx-4 mt-2">
              <DropdownMenuLabel className="flex items-center">
                <Image
                  src={user?.imageUrl}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-4">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  className="flex items-center"
                  onClick={() => router.push("/dashboard/properties")}
                >
                  <Hotel />
                  <span className="ml-4">Properties</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  className="flex items-center"
                  onClick={() => router.push("/dashboard/acquired-bookings")}
                >
                  <CalendarCheck />
                  <span className="ml-4">Bookings</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  className="flex items-center"
                  onClick={() => openUserProfile()}
                >
                  <Settings />
                  <span className="ml-4">Manage account</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button className="flex items-center" onClick={() => signOut()}>
                  <LogOut />
                  <span className="ml-4">Sign out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-4">
            <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
            <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbarr
