import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if the user is trying to access admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          // Admin emails - make sure these match your admin API routes
          const ADMIN_EMAILS = [
            "admin@example.com", // Replace with your actual admin email
            "owner@example.com"  // Add more admin emails as needed
          ]
          
          return token?.email ? ADMIN_EMAILS.includes(token.email) : false
        }
        
        // For other protected routes, just check if token exists
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}