'use client'

import { Input } from "@/components/ui/input"
import { TRANSPORT } from "@/public"

export function TrackingInput() {
  return (
    <div className="space-y-4 bg-white">
      <div className="flex space-x-16">
        <div className="w-3/5">
      <h2 className="text-md  font-semibold text-secondary mb-6">Add Package</h2>
        <Input
          type="text"
          placeholder="Tracking code"
          className="w-full pl-4 pr-12 py-2 border rounded-lg"
        />
        </div>
        <div className="w-2/5">
        <div className="h-full items-center justify-end -mt-2">
         <TRANSPORT />
        </div>
        </div>
      </div>
    </div>
  )
}

