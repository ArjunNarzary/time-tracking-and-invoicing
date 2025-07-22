import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "../prisma"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
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
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
})
