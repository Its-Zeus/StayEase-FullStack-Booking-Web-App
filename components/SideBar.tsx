"use client"
import { useUser } from "@clerk/nextjs"
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import React, { createContext, useContext, useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { SIDENAV_ITEMS } from "@/lib/constants"
import { SideNavItem } from "@/lib/types"

const SideBar = () => {
  const [expanded, setExpanded] = useState(true)
  const { user } = useUser()
  //if (!user) return <div>Not Authenticated...</div>

  return (
    user && (
      <aside className="h-screen bg-background border-r-2 max-w-[280px] sticky">
        <nav className="h-full flex flex-col gap-6 ">
          <div>
            <div className="flex gap-4 py-4 px-4 relative">
              <div className="absolute -right-3  -bottom-3 bg-primary rounded-full text-background hover:opacity-80">
                {expanded ? (
                  <ChevronLeft
                    className="h-5 w-5 m-1 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                  />
                ) : (
                  <ChevronRight
                    className="h-5 w-5 m-1 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                  />
                )}
              </div>

              <Image
                src={user?.imageUrl}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full w-[40px] h-[40px] border-2 border-foreground"
              />
              {expanded && (
                <div className=" whitespace-wrap overflow-hidden">
                  <p className="text-sm ">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <p className="text-sm">
                    Registered: {user?.createdAt?.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <Separator />
          </div>
          <div className="flex flex-col space-y-2  px-4 ">
            {SIDENAV_ITEMS.map((item, idx) => {
              return (
                <MenuItem
                  key={idx}
                  item={item}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              )
            })}
          </div>
        </nav>
      </aside>
    )
  )
}

export default SideBar

const MenuItem = ({
  item,
  expanded,
  setExpanded,
}: {
  item: SideNavItem
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
  }
  const router = useRouter()
  useEffect(() => {
    if (window.innerWidth < 1024) setExpanded(false)
    else setExpanded(true)
  }, [])
  return (
    <div className="relative">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-primary/30 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className={`flex ${!expanded && "hidden overflow-hidden"}`}>
                {item.title}
              </span>
            </div>

            <div
              className={`${subMenuOpen ? "rotate-180" : ""} flex ${
                !expanded && "w-0 overflow-hidden"
              }`}
            >
              <ChevronDown width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div
              className={`my-1 ml-10 flex flex-col space-y-4 ${
                !expanded &&
                "absolute top-0 left-0 bg-background z-10 p-4 rounded-lg shadow-2xl w-[200px]"
              }`}
            >
              {item.submenuItems?.map((subItem, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!expanded) setSubMenuOpen(false)
                      router.push(subItem.path)
                    }}
                    className={`${
                      subItem.path === pathname
                        ? "bg-primary"
                        : "hover:bg-primary/30"
                    } rounded-lg py-2 text-left`}
                  >
                    <span className="ml-4">{subItem.title}</span>
                  </button>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            if (!expanded) {
              setSubMenuOpen(false)
            }
            router.push(item.path)
          }}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg w-full ${
            item.path === pathname ? "bg-primary" : "hover:bg-primary/30"
          }`}
        >
          {item.icon}
          <span className={`flex ${!expanded && "hidden overflow-hidden"}`}>
            {item.title}
          </span>
        </button>
      )}
    </div>
  )
}
