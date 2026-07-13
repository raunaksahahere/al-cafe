import "server-only";

import { redirect } from "next/navigation";
import { auth, isNeonAuthConfigured } from "@/lib/auth";

// No hardcoded fallback email on purpose: if NEON_AUTH_ADMIN_EMAIL isn't set,
// nobody should be treated as an admin. A baked-in fallback here would also
// leak the real admin's email into source control.
export function getAllowedAdminEmail(): string | null {
  const email = process.env.NEON_AUTH_ADMIN_EMAIL?.trim();
  return email ? email.toLowerCase() : null;
}

function hasAdminEmail(email: string | undefined) {
  const allowed = getAllowedAdminEmail();
  return Boolean(allowed && email && allowed === email.toLowerCase());
}

export async function requireAdmin() {
  if (!isNeonAuthConfigured || !getAllowedAdminEmail()) {
    redirect("/admin/login?error=configuration");
  }

  const { data: session } = await auth.getSession();
  if (!session?.user || !hasAdminEmail(session.user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  return session.user;
}

export async function getAdminSession() {
  if (!isNeonAuthConfigured || !getAllowedAdminEmail()) return null;
  const { data: session } = await auth.getSession();
  return session?.user && hasAdminEmail(session.user.email) ? session.user : null;
}
