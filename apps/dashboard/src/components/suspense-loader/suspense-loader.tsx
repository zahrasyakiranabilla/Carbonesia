"use client"

import * as React from "react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface SuspenseLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SuspenseLoader({ children, fallback }: SuspenseLoaderProps) {
  return (
    <React.Suspense
      fallback={
        fallback ?? (
          <div className="flex items-center justify-center py-8">
            <HugeiconsIcon
              icon={Loading03Icon}
              className="h-6 w-6 animate-spin text-muted-foreground"
              strokeWidth={2}
            />
          </div>
        )
      }
    >
      {children}
    </React.Suspense>
  )
}

export default SuspenseLoader
