import {
  CalendarCheck,
  DoorClosed,
  Hotel,
  MessageSquareText,
  Settings,
} from "lucide-react"
import { SideNavItem } from "./types"

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Bookings",
    path: "/bookings",
    icon: <CalendarCheck />,
    submenu: true,
    submenuItems: [
      {
        title: "Hosted Bookings",
        path: "/dashboard/hosted-bookings",
      },
      {
        title: "Acquired Bookings",
        path: "/dashboard/acquired-bookings",
      },
    ],
  },
  {
    title: "Properties",
    path: "/dashboard/properties",
    icon: <Hotel />,
    submenu: false,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <MessageSquareText />,
    submenu: false,
  },
  {
    title: "Account Settings",
    path: "/dashboard/account",
    icon: <Settings />,
    submenu: false,
  },
]
