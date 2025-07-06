"use server"

import { signIn, signOut } from "@/lib/auth/auth"
import { ROUTES } from "@/routes"
import { loginUserSchema, registerUserSchema } from "@/schemas/user"
import { z } from "zod"
import { createUserDb, getUserByEmailDb } from "../db/users"
import { tryCatch } from "@/lib/utils"
import { hashPassword } from "@/lib/auth/password"

export async function credentialLogin(
  unsafeData: z.infer<typeof loginUserSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { success, data } = loginUserSchema.safeParse(unsafeData)

  if (!success) {
    return {
      error: true,
      message: "There was an error logging in",
    }
  }

  const { error } = await tryCatch(
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  )

  if (error) {
    return {
      error: true,
      message: "There was an error logging in",
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: ROUTES.login })
}

export async function registerUser(
  unsafeData: z.infer<typeof registerUserSchema>
): Promise<{ error: boolean; message: string }> {
  const { success, data } = registerUserSchema.safeParse(unsafeData)

  if (!success) {
    return { error: true, message: "There was an error registering user." }
  }

  // Check if user already exist
  const { data: userExist, error: checkUserError } = await tryCatch(
    getUserByEmailDb(data.email)
  )

  if (checkUserError) {
    return { error: true, message: "There was an error registering user." }
  }

  if (userExist) {
    return {
      error: true,
      message: "This email is already registered with us. Try logging in",
    }
  }

  // Encrypt password
  const hashedPassword = await hashPassword(data.password)

  const newUser = {
    email: data.email as string,
    passwordHash: hashedPassword,
    name: null,
    emailVerified: null,
    image: null,
  }

  const { error } = await tryCatch(createUserDb(newUser))

  if (error) {
    return { error: true, message: "There was an error registering user." }
  }

  return {
    error: false,
    message: "User registered successful. Try loggin in.",
  }
}
