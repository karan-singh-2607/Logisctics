import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChangeEvent } from "react"
import { RegistrationData } from "@/lib/axios/types"

interface CompanyDetailsProps {
  data: Partial<RegistrationData>
  onChange: (data: Partial<RegistrationData>) => void
}

export function CompanyDetails({ data, onChange }: CompanyDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Enter company name"
          value={data.companyName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ companyName: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="registrationNumber">Registration Number</Label>
        <Input
          id="registrationNumber"
          placeholder="Enter registration number"
          value={data.registrationNumber || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ registrationNumber: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="taxNumber">Tax Number</Label>
        <Input
          id="taxNumber"
          placeholder="Enter tax number"
          value={data.taxNumber || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ taxNumber: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyType">Company Type</Label>
        <Select
          value={data.companyType || ""}
          onValueChange={(value: string) => onChange({ companyType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select company type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="llc">LLC</SelectItem>
            <SelectItem value="jsc">JSC</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="legalAddress">Legal Address</Label>
        <Input
          id="legalAddress"
          placeholder="Enter legal address"
          value={data.legalAddress || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ legalAddress: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="representativeName">Representative Name</Label>
        <Input
          id="representativeName"
          placeholder="Enter representative name"
          value={data.representativeName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ representativeName: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="representativePosition">Representative Position</Label>
        <Input
          id="representativePosition"
          placeholder="Enter representative position"
          value={data.representativePosition || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ representativePosition: e.target.value })
          }
        />
      </div>
    </div>
  )
}
