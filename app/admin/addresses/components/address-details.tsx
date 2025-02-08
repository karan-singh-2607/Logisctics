'use client'

import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface AddressField {
  label: string
  value: string
}

interface AddressDetailsProps {
  fields: AddressField[]
}

export function AddressDetails({ fields }: AddressDetailsProps) {
  const { toast } = useToast()

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: "The value has been copied to your clipboard.",
      })
    }).catch((err) => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Copy failed",
        description: "There was an error copying the value.",
        variant: "destructive",
      })
    })
  }

  return (
    <div className="space-y-4 bg-white rounded-lg shadow">
      {fields.map((field, index) => (
        <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-b-0">
          <div>
            <div className="text-sm text-gray-500">{field.label}</div>
            <div className="text-gray-900 font-medium">{field.value}</div>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleCopy(field.value)}
          >
            <Copy className="h-5 w-5" />
            <span className="sr-only">Copy {field.label}</span>
          </button>
        </div>
      ))}
    </div>
  )
}

