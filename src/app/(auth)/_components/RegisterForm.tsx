"use client"

import { registerUserSchema } from "@/schemas/user"
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
import { createUser } from "@/server/actions/auth"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { ROUTES } from "@/routes"

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof registerUserSchema>) => {
    const data = await createUser(values)

    if (data) {
      if (data?.error) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
        redirect(ROUTES.login)
      }
    } else {
      toast.error("Something went wrong. Please try again")
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 text-black"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  )
}
