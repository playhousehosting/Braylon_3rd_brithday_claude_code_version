import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For now, allow any @dynamicendpoints.com email with password "admin"
        // TODO: Replace with proper database authentication once Prisma is working
        if (credentials.email.endsWith('@dynamicendpoints.com') && credentials.password === 'admin') {
          return {
            id: "admin-user",
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/admin/signin',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        // Extend the session user type with id
        (session.user as { id?: string }).id = token.sub
      }
      return session
    }
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}