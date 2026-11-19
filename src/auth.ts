import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
const allowed = (email?: string | null) => !!email && (process.env.ADMIN_EMAILS ?? "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
export const { handlers, auth, signIn, signOut } = NextAuth({ providers: [Google], callbacks: { signIn({ profile }) { return profile?.email_verified === true && allowed(profile.email); }, authorized({ auth }) { return allowed(auth?.user?.email); }, session({ session }) { if (!allowed(session.user?.email)) return { ...session, user: undefined as never }; return session; } } });
export async function requireAdmin() { const session = await auth(); if (!allowed(session?.user?.email)) throw new Error("Unauthorized"); return session; }
