import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChangeEvent, DragEvent, useState } from "react"
import { CustomerRole, RegistrationData } from "@/lib/axios/types"
import { Input } from "@heroui/input"


export  function DocumentNumber({ data, onChange }: { data: Partial<RegistrationData>; onChange: (data: Partial<RegistrationData>) => void }) {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <p className="text-center font-semibold">Enter Document Number</p>
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          id="document"
          label="Document Number"
          value={data.document || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ document: e.target.value })
          }
        />
      </div>
    </div>
  )
}