import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

export default {
  providers: [
    Google,
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth_error",
  },
} satisfies NextAuthConfig;
