import { format } from 'date-fns'
import { Plane, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlightData } from '@/lib/axios/types'

interface FlightCardProps {
  data: FlightData
  country: string
}

export function FlightCard({ data, country }: FlightCardProps) {
  const isArrived = data.vehicle_type === 'Arrived'
  const isFlight = data.route_type === 'Flight'

  const Icon = isFlight ? Plane : Truck
  
  return (
    <div className="p-6 bg-white rounded-lg border hover:border-secondary/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-full",
          isArrived ? "bg-green-100" : "bg-orange-100"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            isArrived ? "text-green-500" : "text-orange-600"
          )} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">
              {format(new Date(data.departure_time), 'MMMM d, yyyy')} - {data.vehicle_number}
            </h3>
            <img
              src={`/flags/${country.toLowerCase()}.svg`}
              alt={country}
              className="h-4 w-6 rounded"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Expected Arrival: {format(new Date(data.arrival_time), 'MMMM d, yyyy')}
          </p>
          {data.remark && (
            <p className="text-sm text-muted-foreground">
              {data.remark}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

