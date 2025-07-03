import { User } from "@/generated/prisma"
import prisma from "@/lib/prisma"

export async function getUserByEmail(
  email: string,
  selects?: Record<string, boolean>
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    ...(selects && { select: selects }),
  })

  return user
}

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  const user = await prisma.user.create({
    data,
  })

  return user
}
