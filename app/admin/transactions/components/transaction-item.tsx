'use client'

import { ChevronRight } from 'lucide-react'

interface TransactionItemProps {
  date: string
  type: 'Pay Now' | 'Add Fund'
  amount: number
  onClick: () => void
}

export function TransactionItem({ date, type, amount, onClick }: TransactionItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-full border bg-gray-50 flex items-center justify-center text-secondary font-medium">
        U2G
      </div>

      {/* Content */}
      <div className="flex-1 text-left space-y-2">
        <div className="text-gray-600 text-sm">{date}</div>
        <div className={ `text-sm ${type === 'Pay Now' ? 'text-red-500' : 'text-green-500'}`}>
          {type}
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2">
        <span className="text-gray-900 text-sm font-medium">{amount.toFixed(2)} ₾</span>
        <ChevronRight className="h-5 w-5 text-primary ml-4" />
      </div>
    </button>
  )
}

