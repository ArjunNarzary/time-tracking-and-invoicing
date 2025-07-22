import React from "react"
import LoginForm from "../_components/LoginForm"
import LoginWithGoogle from "../_components/LoginWithGoogle"
import Link from "next/link"
import { ROUTES } from "@/routes"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect(ROUTES.dashboard)
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4">
      <Link
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2"
        href={ROUTES.home}
      >
        <h1 className="text-2xl font-bold py-5">Time Tracking App</h1>
      </Link>
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm h-screen">
        <h2 className="text-2xl font-bold py-4">Login to your account</h2>
        <div className="flex flex-col gap-3 w-full">
          <LoginForm />
          <div className="my-3 flex flex-shrink items-center justify-center gap-2">
            <div className="grow basis-0 border-b border-neutral-200"></div>
            <span className="text-content-muted text-xs font-medium uppercase leading-none">
              or
            </span>
            <div className="grow basis-0 border-b border-neutral-200"></div>
          </div>
          <LoginWithGoogle />
        </div>
        <p className="mt-6 text-center text-sm font-medium text-neutral-500">
          Don&apos;t have an account?&nbsp;
          <a
            className="font-semibold text-neutral-700 transition-colors hover:text-neutral-900"
            href={ROUTES.register}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
