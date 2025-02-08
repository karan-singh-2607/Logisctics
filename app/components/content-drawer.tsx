'use client'

import { Sheet, SheetContent } from "@/components/ui/sheet"

interface ContentDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: string
}

export function ContentDrawer({ open, onOpenChange, children, title }: ContentDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <div className="h-full overflow-auto">
          {title && (
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>
          )}
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}

