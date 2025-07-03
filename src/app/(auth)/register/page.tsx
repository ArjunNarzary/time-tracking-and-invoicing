"use client"

import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email")
      const password = formData.get("password")

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      console.log("response -->", response)

      if (response.status === 201) {
        router.push("/")
      } else {
        console.log(response.status)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button>Register</button>
      </form>
    </div>
  )
}
