import { Package, Home, Clock, Box, CheckCircle } from 'lucide-react'
import { StatusCard } from './components/package/status-card'
import { TrackingInput } from './components/package/tracking-input'
import { EmptyState } from './components/package/empty-state'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Status Cards */}
      <div className="grid grid-cols-5 gap-4">
        <StatusCard
          icon={Package}
          label="Awaiting Packages"
          count={0}
          isActive
        />
        <StatusCard
          icon={Home}
          label="Warehouse"
          count={0}
        />
        <StatusCard
          icon={Clock}
          label="Pending"
          count={0}
        />
        <StatusCard
          icon={Box}
          label="Arrived"
          count={0}
        />
        <StatusCard
          icon={CheckCircle}
          label="Received"
          count={11}
        />
      </div>

      {/* Tracking Section */}
      <div className="bg-white rounded-lg p-6">
        <TrackingInput />
      </div>

      {/* Package List/Empty State */}
      <div className="bg-white rounded-lg p-6">
        <EmptyState />
      </div>
    </div>
  )
}

