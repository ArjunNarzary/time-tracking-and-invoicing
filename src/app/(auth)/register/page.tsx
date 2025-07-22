import Link from "next/link"
import LoginWithGoogle from "../_components/LoginWithGoogle"
import { ROUTES } from "@/routes"
import RegisterForm from "../_components/RegisterForm"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"

export default async function RegisterPage() {
  const session = await auth()

  if (session) {
    redirect(ROUTES.dashboard)
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4 p-3 sm:p-0">
      <Link
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2"
        href={ROUTES.home}
      >
        <h1 className="text-2xl font-bold py-5">Time Tracking App</h1>
      </Link>
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm h-screen">
        <h2 className="text-2xl font-bold py-4">Create your account</h2>
        <div className="flex flex-col gap-3 w-full">
          <RegisterForm />
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
          Already have an account?&nbsp;
          <a
            className="font-semibold text-neutral-700 transition-colors hover:text-neutral-900"
            href={ROUTES.login}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
