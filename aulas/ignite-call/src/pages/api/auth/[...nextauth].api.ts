import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile ${GOOGLE_CALENDAR_SCOPE}`
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(GOOGLE_CALENDAR_SCOPE)) {
        return '/register/connect-calendar?error=permissions'
      }
      return true
    }
  }
}

export default NextAuth(authOptions)