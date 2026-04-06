"use client"

import * as React from "react"
import { useAuth } from "@/features/auth/hooks"
import { isAdmin } from "@/features/auth/types"
import {
  DashboardSquare01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar"
import { Link, useRouterState } from "@tanstack/react-router"

interface NavItem {
  label: string
  href: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: DashboardSquare01Icon,
  },
  {
    label: "Karyawan",
    href: "/employees",
    icon: UserGroupIcon,
    adminOnly: true,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState()
  const { user } = useAuth()

  const visibleNavItems = React.useMemo(() => {
    return navItems.filter((item) => {
      if (!item.adminOnly) return true
      return isAdmin(user)
    })
  }, [user])

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-14 justify-center rounded-none border-t-0 border-b bg-secondary/50 p-0 px-4">
        <div className="flex h-full items-center px-2">
          <h1 className="text-sm font-semibold">Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleNavItems.map((item) => {
                const isActive = routerState.location.pathname === item.href

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      render={
                        <Link to={item.href}>
                          <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
