import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/signin",
  },
  callbacks: {
    authorized: ({ token }) => {
      if (!token?.email) return false
      // Allow access to admin panel for dynamicendpoints.com emails
      return token.email.endsWith('@dynamicendpoints.com')
    }
  }
})

export const config = {
  matcher: ["/admin", "/admin/((?!signin).*)"],
}