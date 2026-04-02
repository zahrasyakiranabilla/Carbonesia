"use client"

import * as React from "react"
import {
  DashboardSquare01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link, useRouterState } from "@tanstack/react-router"

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

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: DashboardSquare01Icon,
  },
  {
    label: "Employee Management",
    href: "/employees",
    icon: UserGroupIcon,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-14 justify-center px-4 rounded-none border-t-0 p-0">
        <div className="flex h-full items-center px-2">
          <h1 className="text-sm font-semibold">Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
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
