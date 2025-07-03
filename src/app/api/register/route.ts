import { hashPassword } from "@/lib/auth/password"
import { tryCatch } from "@/lib/utils"
import { createUser as createUserDb } from "@/server/db/users"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Check if email already registered

  //Zod validation
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    )
  }

  // Encrypt password
  const hashedPassword = await hashPassword(password)

  const newUser = {
    email: email as string,
    passwordHash: hashedPassword,
    name: null,
    emailVerified: null,
    image: null,
  }

  const { data: user, error } = await tryCatch(createUserDb(newUser))

  if (error || !user) {
    return NextResponse.json(
      { message: "Could not create user" },
      { status: 500 }
    )
  }

  return NextResponse.json(user, { status: 201 })
}
