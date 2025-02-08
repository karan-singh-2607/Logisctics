import { Suspense } from 'react'
import { FlightSchedule } from './components/flight-schedule'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
  title: 'Flight Schedule - USA2GEORGIA',
  description: 'View our current flight schedules and shipping routes',
}

export default function FlightsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Flights Schedule</h1>
      <Suspense fallback={<FlightScheduleSkeleton />}>
        <FlightSchedule />
      </Suspense>
    </div>
  )
}

function FlightScheduleSkeleton() {
  return (
    <div className="space-y-8">
      <div className="border-b space-y-4">
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}

