"use server"

import { signIn, signOut } from "@/lib/auth/auth"
import { hashPassword } from "@/lib/auth/password"
import { ROUTES } from "@/routes"
import { loginUserSchema, registerUserSchema } from "@/schemas/user"
import { z } from "zod"
import {
  createUser as createUserDb,
  getUserByEmail as getUserByEmailDb,
} from "../db/users"
import { tryCatch } from "@/lib/utils"
import { redirect } from "next/navigation"

export async function credentialLogin(
  unsafeData: z.infer<typeof loginUserSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { success, data } = loginUserSchema.safeParse(unsafeData)

  if (!success) {
    return { error: true, message: "There was an error logging in." }
  }

  const { error } = await tryCatch(
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  )

  if (error) {
    return { error: true, message: "There was an error logging in." }
  }

  redirect(ROUTES.dashboard)
}

export async function logout() {
  await signOut({ redirectTo: ROUTES.login })
}

export async function createUser(
  unsafeData: z.infer<typeof registerUserSchema>
): Promise<{ error: boolean; message: string }> {
  const { success, data } = registerUserSchema.safeParse(unsafeData)

  if (!success) {
    return { error: true, message: "There was an error registering." }
  }

  // Check if email already registered
  const { data: isUserExist, error: userCheckError } = await tryCatch(
    getUserByEmailDb(data.email)
  )

  if (userCheckError) {
    return { error: true, message: "There was an error registering." }
  }

  if (isUserExist) {
    return {
      error: true,
      message: "This email is already registered with us. Try logging in.",
    }
  }

  // Encrypt password
  const hashedPassword = await hashPassword(data.password)

  const newUser = {
    email: data.email as string,
    passwordHash: hashedPassword,
    name: data.name,
    emailVerified: null,
    image: null,
  }

  const { data: user, error } = await tryCatch(createUserDb(newUser))

  if (error || !user) {
    return { error: true, message: "There was an error registering." }
  }

  return {
    error: false,
    message: "User registered successful. Login to your account.",
  }
}
