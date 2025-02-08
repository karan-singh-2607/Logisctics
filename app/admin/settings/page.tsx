'use client'

import { useState } from 'react'
import { User, Key, Bell, CreditCard, Scissors, MapPin, Truck, ChevronRight } from 'lucide-react'
import { ViewProfile } from './components/view-profile'
import { ChangePassword } from './components/change-password'
import { Notifications } from './components/notifications'
import { Payments } from './components/payments'
import { CutDown } from './components/cut-down'
import { BranchLocker } from './components/branch-locker'
import { ShippingMethod } from './components/shipping-method'
import { Drawer } from '@/components/ui/drawer2'


const settingsItems = [
  { id: 'profile', title: 'View Profile', icon: User, component: ViewProfile },
  { id: 'password', title: 'Change Password', icon: Key, component: ChangePassword },
  { id: 'notifications', title: 'Notifications', icon: Bell, component: Notifications },
  { id: 'payments', title: 'Payments', icon: CreditCard, component: Payments },
  { id: 'cutdown', title: 'Cut-Down', icon: Scissors, component: CutDown },
  { id: 'branch', title: 'Branch / Locker', icon: MapPin, component: BranchLocker },
  { id: 'shipping', title: 'Shipping Method from China', icon: Truck, component: ShippingMethod },
]

export default function SettingsPage() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="space-y-2">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveDrawer(item.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-colors ${
              item.id === 'profile' ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${item.id === 'profile' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <item.icon className={`h-5 w-5 ${item.id === 'profile' ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>

      {settingsItems.map((item) => (
        <Drawer
          key={item.id}
          open={activeDrawer === item.id}
          onOpenChange={(open) => setActiveDrawer(open ? item.id : null)}
          title={item.title}
        >
          <item.component />
        </Drawer>
      ))}
    </div>
  )
}

