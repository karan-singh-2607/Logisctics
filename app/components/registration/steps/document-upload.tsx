import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChangeEvent, DragEvent, useState } from "react"
import { CustomerRole, RegistrationData } from "@/lib/axios/types"

interface DocumentUploadProps {
  type: CustomerRole.LOCAL | CustomerRole.FOREIGNER | CustomerRole.LEGAL_PERSON
  data: Partial<RegistrationData>
  onChange: (data: Partial<RegistrationData>) => void
}

export function DocumentUpload({ type, data, onChange }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  // Use the enum values as keys in your mapping.
  const documents: Record<CustomerRole, { key: string; label: string; required: boolean }[]> = {
    [CustomerRole.LOCAL]: [
      { key: "idCardFront", label: "ID Card (Front)", required: true },
      { key: "idCardBack", label: "ID Card (Back)", required: true },
    ],
    [CustomerRole.FOREIGNER]: [
      { key: "passport", label: "Passport", required: true },
      { key: "residencePermit", label: "Residence Permit", required: false },
    ],
    [CustomerRole.LEGAL_PERSON]: [
      { key: "companyRegistration", label: "Company Registration Certificate", required: true },
      { key: "taxRegistration", label: "Tax Registration Document", required: true },
      { key: "directorId", label: "Director's ID", required: true },
    ],
  }
    // Common handler for when a file is selected (either via input change or drop)
    const handleFile = (key: string, file: File | null) => {
      // Only accept if file is present and of allowed type
      if (file) {
        // Check if the file is an image or PDF
        if (file.type.startsWith("image/") || file.type === "application/pdf") {
          // For simplicity, we simulate file upload by storing the file name.
          onChange({ [key]: file.name })
        } else {
          // Optionally, you can alert the user about unsupported file types.
          alert("Only image or PDF files are allowed.")
        }
      }
    }

    
    const handleFileChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
      // For simplicity, we simulate file upload by storing the file name.
    const file = e.target.files ? e.target.files[0] : null
    handleFile(key, file)
    }

     // Drag events for the drop zone
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (key: string, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null
    handleFile(key, file)
  }

  return (
    <div className="space-y-6">
      {documents[type as keyof typeof documents].map((doc, index) => (
        <div key={index} className="space-y-2">
          <Label>
            {doc.label}
            {doc.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div  onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(doc.key, e)}
            className={`border-2 border-dashed rounded-lg p-4 transition-colors hover:border-secondary ${
              dragActive ? "border-secondary bg-gray-100" : "border-gray-300"
            }`}
            >
            <input
              type="file"
              id={doc.key}
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFileChange(doc.key, e)
              }
              accept="image/*,application/pdf"
            />
            <label htmlFor={doc.key}>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {data[doc.key as keyof RegistrationData]
                  ? `Uploaded: ${data[doc.key as keyof RegistrationData]}`
                  : `Upload ${doc.label}`}
              </Button>
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}
