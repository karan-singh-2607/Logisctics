'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: string
  className?: string
}

export function Drawer({ open, onOpenChange, children, title, className }: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={`w-full sm:max-w-xl pl-12 py-8 rounded-l-xl ${className}`}>
        {title && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        )}
        <div className="h-full mt-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}

