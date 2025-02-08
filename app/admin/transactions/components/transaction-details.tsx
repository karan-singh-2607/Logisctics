import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface TransactionDetailsProps {
  date: string
  type: string
  amount: number
  unusedCredits: number
}

export function TransactionDetails({ 
  date,
  type,
  amount,
  unusedCredits
}: TransactionDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Date */}
      <div className="space-y-1">
        <div className="text-sm text-gray-500">Date</div>
        <div>{date}</div>
      </div>

      {/* Type */}
      <div className="space-y-1">
        <div className="text-sm text-gray-500">Type</div>
        <div>{type}</div>
      </div>

      {/* Invoice */}
      <div className="space-y-2">
        <div className="text-sm text-gray-500">Invoice</div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span>Invoice</span>
          </div>
          <Button variant="ghost" size="icon" className="text-secondary">
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <div className="text-sm text-gray-500">Amount</div>
        <div>{amount.toFixed(2)} ₾</div>
      </div>

      {/* Unused Credits */}
      <div className="space-y-1">
        <div className="text-sm text-gray-500">Unused Credits</div>
        <div>{unusedCredits.toFixed(2)} ₾</div>
      </div>
    </div>
  )
}

