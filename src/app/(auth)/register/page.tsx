"use client"

import Link from "next/link"
import LoginWithGoogle from "../_components/LoginWithGoogle"
import { ROUTES } from "@/routes"
import RegisterForm from "../_components/RegisterForm"

export default function RegisterPage() {
  // const router = useRouter()
  // async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   try {
  //     const formData = new FormData(event.currentTarget)
  //     const email = formData.get("email")
  //     const password = formData.get("password")

  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     })

  //     console.log("response -->", response)

  //     if (response.status === 201) {
  //       router.push("/")
  //     } else {
  //       console.log(response.status)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4">
      <Link
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2"
        href={ROUTES.home}
      >
        <h1 className="text-2xl font-bold py-5">Time Tracking App</h1>
      </Link>
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md h-screen">
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
