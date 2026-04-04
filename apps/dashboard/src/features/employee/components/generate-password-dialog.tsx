"use client"

import * as React from "react"
import { CheckmarkCircleIcon, CopyIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog"
import { Input } from "@repo/ui/components/input"

interface GeneratePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  password: string
  title?: string
  description?: string
}

export function GeneratePasswordDialog({
  open,
  onOpenChange,
  password,
  title = "Password Telah Dibuat",
  description = "Silakan salin dan simpan password ini di tempat yang aman.",
}: GeneratePasswordDialogProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Password Display */}
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="pr-10 font-mono text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-0 right-0"
              onClick={handleCopy}
            >
              <HugeiconsIcon
                icon={copied ? CheckmarkCircleIcon : CopyIcon}
                strokeWidth={2}
              />
            </Button>
          </div>

          {/* Warning Message */}
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="text-xs">
              Password tidak dapat dilihat kembali setelah dialog ini ditutup.
              Pastikan Anda telah menyalin dan menyimpan password ini.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Tutup
          </Button>
          <Button onClick={handleCopy} variant="secondary">
            <HugeiconsIcon icon={CopyIcon} strokeWidth={2} className="mr-2" />
            {copied ? "Tersalin" : "Salin Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
