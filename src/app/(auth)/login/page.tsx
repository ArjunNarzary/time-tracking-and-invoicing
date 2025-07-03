"use client"

import React from "react"
// import { credentialLogin } from "@/server/actions/auth"
// import { useRouter } from "next/navigation"
// import { ROUTES } from "@/routes"
import LoginForm from "../_components/LoginForm"

const LoginPage = () => {
  // const router = useRouter()

  // async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   try {
  //     const formData = new FormData(event.currentTarget)
  //     const response = await credentialLogin(formData)

  //     if (!!response.error) {
  //       // router.push("/")
  //     } else {
  //       router.push(ROUTES.dashboard)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  return (
    <div>
      <div>
        <h1>Time Tracking App</h1>
        <h2>Login to your account</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
