import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
}

export function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg border hover:border-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-secondary">
          {icon}
        </div>
        <h3 className="text-gray-600 font-medium">{title}</h3>
      </div>
    </div>
  )
}

