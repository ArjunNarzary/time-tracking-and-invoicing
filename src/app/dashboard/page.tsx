import { logout } from "@/server/actions/auth"

export default function DashboardPage() {
  return (
    <div>
      Dashboard Page
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  )
}
