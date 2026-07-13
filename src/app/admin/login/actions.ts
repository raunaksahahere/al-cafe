"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAllowedAdminEmail } from "@/lib/admin-auth";
import { auth, isNeonAuthConfigured } from "@/lib/auth";

const loginAttempts = new Map<string, number[]>();
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentAttempts = (loginAttempts.get(ip) ?? []).filter((attempt) => now - attempt < LOGIN_WINDOW_MS);

  if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) {
    loginAttempts.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  loginAttempts.set(ip, recentAttempts);
  return false;
}

export async function signInWithGoogle(previousState: { error?: string }) {
  void previousState;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? requestHeaders.get("x-real-ip")
    ?? "unknown";

  // This in-memory limiter resets on restart/redeploy and does not work across
  // multiple instances. Replace it with Upstash rate limiting before scaling out.
  if (isRateLimited(ip)) {
    return { error: "Too many sign-in attempts. Please try again in a few minutes." };
  }

  if (!isNeonAuthConfigured) return { error: "Neon Auth has not been configured." };

  const adminEmail = getAllowedAdminEmail();
  if (!adminEmail) return { error: "NEON_AUTH_ADMIN_EMAIL is not set." };

  const { data, error } = await auth.signIn.social({
    provider: "google",
    callbackURL: "/admin",
    errorCallbackURL: "/admin/login?error=oauth",
    loginHint: adminEmail,
  });

  if (error) return { error: error.message || "Unable to start Google sign in." };
  if (data?.url) redirect(data.url);

  return { error: "Unable to start Google sign in." };
}
