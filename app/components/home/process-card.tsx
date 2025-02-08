interface ProcessCardProps {
  title: string
  description: string
}

export function ProcessCard({ title, description }: ProcessCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-2">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

