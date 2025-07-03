import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function PasswordInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div>
      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        type="button"
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
