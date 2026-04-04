import type * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "@repo/ui/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
  delay?: number
  closeDelay?: number
}

function TooltipProvider({
  children,
  delay = 200,
  closeDelay = 300,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delay={delay} closeDelay={closeDelay}>
      {children}
    </TooltipPrimitive.Provider>
  )
}

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  className?: string
  contentClassName?: string
}

function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = "top",
  align = "center",
  sideOffset = 4,
  className,
  contentClassName,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger className={className}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <TooltipPrimitive.Popup
            className={cn(
              "z-50 animate-in overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md fade-in-0 zoom-in-95",
              contentClassName
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-popover" />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export { Tooltip, TooltipProvider }
