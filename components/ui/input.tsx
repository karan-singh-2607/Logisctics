import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode; // Option to pass a left-side icon
  isPassword?: boolean; // Specify if it's a password input
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, isPassword = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handlePasswordToggle = () => {
      setShowPassword((prev) => !prev);
    };
console.log('isPassword', isPassword)
    return (
      <div className="relative flex items-center">
        {/* Left Icon */}
        {icon && <div className="absolute left-3">{icon}</div>}

        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon ? "pl-10" : "", // Adjust padding if there's an icon
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 text-muted-foreground"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
