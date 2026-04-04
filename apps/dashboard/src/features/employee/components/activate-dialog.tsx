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

interface ActivateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
  onConfirm: () => void
  isLoading?: boolean
}

export function ActivateDialog({
  open,
  onOpenChange,
  employee,
  onConfirm,
  isLoading = false,
}: ActivateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aktifkan Karyawan</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin mengaktifkan akun{" "}
            <span className="font-medium text-foreground">{employee?.name}</span>?
            Karyawan akan dapat mengakses sistem setelah diaktifkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Mengaktifkan..." : "Aktifkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}