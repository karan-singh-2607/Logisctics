import { CustomerRole } from '@/lib/axios/types';
import { Building2, ChevronRight, User } from 'lucide-react'
import { cloneElement } from 'react';

interface CustomerTypeOptionProps {
  icon: React.ReactNode
  title: string
  options?: { label: string; value: CustomerRole.LOCAL | CustomerRole.FOREIGNER | CustomerRole.LEGAL_PERSON }[]
  onClick: (type: CustomerRole.LOCAL | CustomerRole.FOREIGNER | CustomerRole.LEGAL_PERSON) => void
}

function CustomerTypeOption({ icon, title, options, onClick }: CustomerTypeOptionProps) {
  const renderIcon = () =>
    cloneElement(icon as React.ReactElement, {
      // Merge existing classes with the group-hover class.
      className: `${(icon as React.ReactElement).props.className || ''} group-hover:text-secondary`,
    })

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="space-y-2">
          {options&&options?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onClick(option.value)}
              className="w-full flex items-center justify-between px-4 py-8 bg-gray-100 border rounded-lg hover:border-secondary group"
            >
              <div className="flex items-center gap-3">
                {renderIcon()}
                <span className="font-medium group-hover:text-secondary">{option.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-secondary" />
            </button>
          ))}
        </div>
    </div>
  )
}

interface CustomerTypeProps {
  onSelectType: (type: CustomerRole.LOCAL | CustomerRole.FOREIGNER | CustomerRole.LEGAL_PERSON) => void
}

export function CustomerType({ onSelectType }: CustomerTypeProps) {
  return (
    <div className="space-y-6 px-8 py-12">
      <CustomerTypeOption
        icon={<User className="h-5 w-5 hover:text-secondary" />}
        title="Individual Person"
        options={[
          { label: 'Local', value: CustomerRole.LOCAL },
          { label: 'Foreigner', value: CustomerRole.FOREIGNER },
        ]}
        onClick={onSelectType} 
      />
      <CustomerTypeOption
        icon={<Building2 className="h-5 w-5 " />}
        title="Legal Person"
        options={[
          { label: 'Legal person', value: CustomerRole.LEGAL_PERSON },
        ]}
        onClick={onSelectType} 
      />
    </div>
  )
}

