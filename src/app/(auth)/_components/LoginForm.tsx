"use client"

import { loginUserSchema } from "@/schemas/user"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PasswordInput from "./PasswordInput"
import { Button } from "@/components/ui/button"
import { credentialLogin } from "@/server/actions/auth"
import { toast } from "sonner"

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
    const data = await credentialLogin(values)
    if (data && data.error) {
      toast.error(data.message)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 text-black"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className="text-md h-10"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
