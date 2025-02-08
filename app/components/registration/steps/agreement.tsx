import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RegistrationData } from "@/lib/axios/types"
import { ChangeEvent } from "react"

interface AgreementProps {
  data: Partial<RegistrationData>
  onChange: (data: Partial<RegistrationData>) => void
}

export function Agreement({ data, onChange }: AgreementProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-600">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            You acknowledge that you have read and understood our data practices as described
            in our Privacy Policy.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={!!data.terms}
            onCheckedChange={(checked) => onChange({ terms: checked === true })}
            />
          <Label htmlFor="terms" className="text-sm leading-none pt-0.5">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="marketing"
            checked={!!data.marketing}
            onCheckedChange={(checked) => onChange({ marketing: checked === true })}
            />
          <Label htmlFor="marketing" className="text-sm leading-none pt-0.5">
            I agree to receive marketing communications
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="dataProcessing"
            checked={!!data.dataProcessing}
            onCheckedChange={(checked) => onChange({ dataProcessing: checked === true })}
            />
          <Label htmlFor="dataProcessing" className="text-sm leading-none pt-0.5">
            I consent to the processing of my personal data as described in the Privacy Policy
          </Label>
        </div>
      </div>
    </div>
  )
}
