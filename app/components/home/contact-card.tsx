interface ContactCardProps {
  title: string
  address: string
  hours: string[]
  phone?: string
}

export function ContactCard({ title, address, hours, phone }: ContactCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg border space-y-4">
      <h3 className="font-medium">{title}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>{address}</p>
        {hours.map((time, index) => (
          <p key={index}>{time}</p>
        ))}
        {phone && <p className="text-secondary">{phone}</p>}
      </div>
    </div>
  )
}

