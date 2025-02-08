import { type LucideIcon } from 'lucide-react'

interface StatusCardProps {
  icon: LucideIcon
  label: string
  count: number
  isActive?: boolean
}

export function StatusCard({ icon: Icon, label, count, isActive }: StatusCardProps) {
  return (
    <div
      className={`
        relative rounded-lg py-6 px-2 flex flex-col items-center gap-2
        ${isActive 
          ? 'bg-secondary text-white' 
          : 'bg-white text-gray-400 hover:bg-gray-50'}
      `}
    >
      {count >= 0 && (
        <div className="absolute top-2 right-2 min-w-[20px] h-5 rounded-full bg-[#ebecef] text-gray-400 text-xs flex items-center justify-center px-1">
          {count}
        </div>
      )}
      <Icon className="h-6 w-6" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

