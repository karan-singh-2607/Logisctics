import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";
import { CustomerRole, RegistrationData } from "@/lib/axios/types";
import { Input } from "@heroui/input";
interface PersonalInfoProps {
  type: CustomerRole.LOCAL | CustomerRole.FOREIGNER | CustomerRole.LEGAL_PERSON;
  data: Partial<RegistrationData>;
  onChange: (data: Partial<RegistrationData>) => void;
}

export function PersonalInfo({ type, data, onChange }: PersonalInfoProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <p className="text-center">Personal information</p>
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          id="firstName"
          label="Enter your first name"
          value={data.first_name || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ first_name: e.target.value })
          }
          maxLength={50} 
        />
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          id="lastName"
          label="Enter your last name"
          value={data.last_name || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ last_name: e.target.value })
          }
          maxLength={50} 
        />
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          id="email"
          type="email"
          label="Enter your email"
          value={data.email || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ email: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          id="phone"
          type="tel"
          label="Enter your phone number"
          value={data.mobile || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ mobile: e.target.value })
          }
          maxLength={15}  // Prevent excessively long phone numbers
        />
      </div>
      {/* <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={data.dob || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ dob: e.target.value })
          }
        />
      </div> */}
      {/* {type === "foreigner" && (
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            placeholder="Enter your nationality"
            value={data.nationality || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({ nationality: e.target.value })
            }
          />
        </div>
      )} */}
      {/* <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter your address"
          value={data.address || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange({ address: e.target.value })
          }
        />
      </div> */}
    </div>
  );
}
