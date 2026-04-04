"use client"

import {
  Add01Icon,
  Edit01Icon,
  LockIcon,
  UserUnlock01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table"
import { useNavigate } from "@tanstack/react-router"

import type { Employee } from "../types"

interface EmployeeListProps {
  employees: Employee[]
  onActivate: (employee: Employee) => void
  onDeactivate: (employee: Employee) => void
}

export function EmployeeList({
  employees,
  onActivate,
  onDeactivate,
}: EmployeeListProps) {
  const navigate = useNavigate()

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Belum ada karyawan</p>
        <Button
          variant="link"
          onClick={() => navigate({ to: "/employees/create" })}
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="mr-1" />
          Tambah karyawan pertama
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>
              <Badge variant={employee.active ? "default" : "secondary"}>
                {employee.active ? "Aktif" : "Nonaktif"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    navigate({
                      to: "/employees/$id/edit",
                      params: { id: employee.id },
                    } as any)
                  }
                  title="Edit"
                >
                  <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
                </Button>
                {employee.active ? (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDeactivate(employee)}
                    title="Nonaktifkan"
                  >
                    <HugeiconsIcon icon={UserUnlock01Icon} strokeWidth={2} />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onActivate(employee)}
                    title="Aktifkan"
                  >
                    <HugeiconsIcon icon={LockIcon} strokeWidth={2} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
