"use client"

import { Button } from "@repo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog"
import type { Employee } from "../types"

interface DeactivateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
  onConfirm: () => void
  isLoading?: boolean
}

export function DeactivateDialog({
  open,
  onOpenChange,
  employee,
  onConfirm,
  isLoading = false,
}: DeactivateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nonaktifkan Karyawan</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menonaktifkan akun{" "}
            <span className="font-medium text-foreground">{employee?.name}</span>?
            Karyawan tidak akan dapat mengakses sistem setelah dinonaktifkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button variant="secondary" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Menonaktifkan..." : "Nonaktifkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}