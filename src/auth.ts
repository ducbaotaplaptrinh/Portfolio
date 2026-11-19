import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { canSignIn, isAllowedEmail } from "@/lib/authorization";
const allowed = (email?: string | null) => isAllowedEmail(email, process.env.ADMIN_EMAILS);
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    signIn({ profile }) { return canSignIn(profile?.email, profile?.email_verified, process.env.ADMIN_EMAILS); },
    authorized({ auth }) { return allowed(auth?.user?.email); },
    session({ session }) { if (!allowed(session.user?.email)) return { ...session, user: undefined as never }; return session; },
  },
});
export async function requireAdmin() { const session = await auth(); if (!allowed(session?.user?.email)) throw new Error("Unauthorized"); return session; }
