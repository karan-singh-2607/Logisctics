'use client'

import { useState } from 'react'
import { TransactionItem } from './components/transaction-item'
import { TransactionDetails } from './components/transaction-details'
import { Drawer } from '@/components/ui/drawer2'

// Sample data - replace with real data in production
const transactions = [
  {
    id: 1,
    date: '04 May 2019',
    type: 'Pay Now' as const,
    amount: -2.19,
    unusedCredits: 0.00
  },
  {
    id: 2,
    date: '04 May 2019',
    type: 'Pay Now' as const,
    amount: -2.19,
    unusedCredits: 0.00
  },
  {
    id: 3,
    date: '04 May 2019',
    type: 'Add Fund' as const,
    amount: 4.38,
    unusedCredits: 0.00
  },
  {
    id: 4,
    date: '17 April 2019',
    type: 'Pay Now' as const,
    amount: -2.18,
    unusedCredits: 0.00
  },
]

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            date={transaction.date}
            type={transaction.type}
            amount={transaction.amount}
            onClick={() => setSelectedTransaction(transaction)}
          />
        ))}
      </div>

      <Drawer
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <TransactionDetails
            date={selectedTransaction.date}
            type={selectedTransaction.type}
            amount={selectedTransaction.amount}
            unusedCredits={selectedTransaction.unusedCredits}
          />
        )}
      </Drawer>
    </div>
  )
}

