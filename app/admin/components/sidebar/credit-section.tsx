'use client'

import { Button } from "@/components/ui/button"

interface CreditSectionProps {
  unusedCredits: number
  amountDue: number
}

export function CreditSection({ unusedCredits, amountDue }: CreditSectionProps) {
  return (
    <div className="space-y-4 flex justify-between mb-2">
      <div className="bg-[#1f1f22] p-2 rounded-lg text-center w-full">
        <div className="text-gray-400 text-xs">Unused Credits</div>
        <div className="text-sm font-medium text-white mt-2">
          {unusedCredits.toFixed(2)} GEL
        </div>
      <Button 
        className="w-full bg-secondary rounded-full mt-4 hover:bg-secondary/90 text-white"
        size="sm"
      >
        add funds
      </Button>
      </div>
      <div className="space-y-1 flex flex-col items-center justify-center w-full">
        <div className="text-gray-400 text-xs">Amount Due</div>
        <div className="text-[#00FF29] text-sm font-medium">
          {amountDue.toFixed(2)} GEL
        </div>
      </div>
    </div>
  )
}

