import { User } from 'lucide-react'

interface UserProfileProps {
  name: string
  suiteId: string
}

export function UserProfile({ name, suiteId }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-4 mt-20 mb-8">
      <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="h-6 w-6 text-gray-400" />
      </div>
      <div>
        <h2 className="text-white font-medium">{name}</h2>
        <div className="text-gray-400 text-sm">
          Suite: <span className="text-secondary">{suiteId}</span>
        </div>
      </div>
    </div>
  )
}

