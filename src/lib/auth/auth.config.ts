interface IAuthConfig {
  session: {
    strategy: "jwt" | "database" | undefined
  }
  providers: []
}

export const authConfig: IAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
}
