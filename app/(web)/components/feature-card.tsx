interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description?: string | null
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg border hover:border-secondary/50 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-secondary">
            {icon}
          </div>
          <h3 className="text-gray-600 font-medium">{title}</h3>
        </div>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  )
}

