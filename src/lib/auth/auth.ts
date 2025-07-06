import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "../prisma"
import Credentials from "next-auth/providers/credentials"
import { validatePassword } from "./password"
import { getUserByEmailDb } from "@/server/db/users"
import { User } from "@/generated/prisma"
import { tryCatch } from "../utils"
import { authConfig } from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null
        const { email, password } = credentials

        if (!email || !password) return null

        try {
          const selects = {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
          }
          const { data: user, error } = await tryCatch<User | null>(
            getUserByEmailDb(email as string, selects)
          )

          if (error || !user || !user?.passwordHash) {
            return null
          }

          // Check password
          if (
            !validatePassword({
              password: password as string,
              passwordHash: user?.passwordHash as string,
            })
          ) {
            return null
          }
          return user
        } catch {
          return null
        }
      },
    }),
  ],
})
