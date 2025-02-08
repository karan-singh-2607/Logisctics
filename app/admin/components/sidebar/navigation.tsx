'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, MapPin, Settings, MessageSquare, MessageCircle } from 'lucide-react'

const navigation = [
  { name: 'Transactions', href: '/admin/transactions', icon: CreditCard },
  { name: 'Addresses', href: '/admin/addresses', icon: MapPin },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Tickets', href: '/admin/tickets', icon: MessageSquare },
  { name: 'SMS Codes', href: '/admin/sms-codes', icon: MessageCircle },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center px-4 py-2 text-sm rounded-lg group
              ${isActive 
                ? 'bg-secondary/10 text-secondary' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'}
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

