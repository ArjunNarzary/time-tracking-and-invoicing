export const ROUTES = {
  login: "/login",
  register: "/register",
  googleCallback: "/api/auth/callback/google",
  home: "/",
  dashboard: "/dashboard",
  clients: "/clients",
  projects: "/projects",
  timeTracking: "/time-tracking",
  invoices: "/invoices",
}

export const PUBLIC_ROUTES = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.googleCallback,
]
