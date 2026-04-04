"use client"

import * as React from "react"

import { Button } from "@repo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog"
import { GeneratePasswordDialog } from "./generate-password-dialog"
import type { Employee } from "../types"

interface ResetPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
  onConfirm: () => void
  isLoading?: boolean
  newPassword?: string
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  employee,
  onConfirm,
  isLoading = false,
  newPassword,
}: ResetPasswordDialogProps) {
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false)

  const handleConfirm = () => {
    if (newPassword) {
      setShowPasswordDialog(true)
    } else {
      onConfirm()
      onOpenChange(false)
    }
  }

  const handlePasswordDialogClose = () => {
    setShowPasswordDialog(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mereset password untuk{" "}
              <span className="font-medium text-foreground">{employee?.name}</span>?
              Password baru akan dihasilkan secara otomatis.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Mereset..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {newPassword && (
        <GeneratePasswordDialog
          open={showPasswordDialog}
          onOpenChange={handlePasswordDialogClose}
          password={newPassword}
          title="Password Baru Dibuat"
          description={`Password baru untuk ${employee?.name}. Silakan salin dan simpan password ini.`}
        />
      )}
    </>
  )
}