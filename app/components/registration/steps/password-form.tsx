import { RegistrationData } from "@/lib/axios/types";
import { Input } from "@heroui/input";
import { ChangeEvent } from "react";

export  function PasswordForm({ data, onChange }: { data: Partial<RegistrationData>; onChange: (data: Partial<RegistrationData>) => void }) {
    return (
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-center font-semibold">Set Password</p>
        </div>
        <div className="space-y-2">
          <Input
            isRequired
            type="password"
            id="password"
            label="Password"
            value={data.password || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({ password: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Input
            isRequired
            type="password"
            id="password_confirmation"
            label="Confirm Password"
            value={data.password_confirmation || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({ password_confirmation: e.target.value })
            }
          />
        </div>
      </div>
    )
  }