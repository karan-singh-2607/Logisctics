import { Plane, Truck } from 'lucide-react'
import { userService } from '@/lib/axios/services/user.service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlightCard } from './flight-card'
import type { FlightData } from '@/lib/axios/types'

export async function FlightSchedule() {
  const flightData = await userService.getFlights()
  const countries = Object.keys(flightData)

  return (
    <Tabs defaultValue={countries[0]} className="space-y-8">
      <TabsList>
        {countries.map((country) => (
          <TabsTrigger key={country} value={country} className="min-w-[100px]">
            {country}
          </TabsTrigger>
        ))}
      </TabsList>
      {countries.map((country) => (
        <TabsContent key={country} value={country} className="space-y-4">
          {flightData[country].map((flight, index) => (
            <FlightCard
              key={`${flight.vehicle_number}-${index}`}
              data={flight}
              country={country}
            />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

