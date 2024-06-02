"use client"
import { useAuth, UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import React from "react"
import { ModeToggle } from "./ModeToogle"
import { Button } from "./ui/button"

const Header = () => {
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  return (
    <div>
      <div className="flex justify-between py-4">
        <h1 className="font-bold text-2xl">StayEase</h1>
        <div className="flex gap-6">
          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
              <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
