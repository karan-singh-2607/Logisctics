interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="space-y-4">
      <div className="text-secondary">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

