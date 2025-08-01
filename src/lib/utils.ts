import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Types for the result object with discriminated union
type Success<T> = {
  data: T
  error: null
}

type Failure<E> = {
  data: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}

export function getFirstTwoCharacter(name: string) {
  if (!name) return ""
  const splitFullName = name.toUpperCase().split(" ")
  if (splitFullName.length > 1) {
    return splitFullName[0].charAt(0) + splitFullName[1].charAt(0)
  } else {
    const splitFirstName = splitFullName[0].split("")
    return splitFirstName.splice(0, 2).join("")
  }
}
