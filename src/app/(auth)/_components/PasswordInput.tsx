import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function PasswordInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-full relative">
      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        className="py-5 text-black"
        {...props}
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        type="button"
        className="absolute right-3 top-3 text-gray-500"
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  )
}
