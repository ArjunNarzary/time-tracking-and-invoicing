"use server"

import { signIn, signOut } from "@/lib/auth/auth"
import { ROUTES } from "@/routes"

export async function credentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    return response
  } catch (err) {
    throw err
  }
}

export async function logout() {
  await signOut({ redirectTo: ROUTES.login })
}
