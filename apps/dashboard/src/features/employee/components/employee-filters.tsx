"use client"

import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Input } from "@repo/ui/components/input"

interface EmployeeFiltersProps {
  search: string
  onSearchChange: (search: string) => void
}

export function EmployeeFilters({
  search,
  onSearchChange,
}: EmployeeFiltersProps) {
  return (
    <div className="relative w-full sm:w-auto sm:min-w-[280px]">
      <HugeiconsIcon
        icon={Search01Icon}
        className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
        strokeWidth={2}
      />
      <Input
        placeholder="Cari nama atau email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
