import "server-only";

import { createNeonAuth } from "@neondatabase/auth/next/server";
import { validateProductionEnvironment } from "@/lib/env";

validateProductionEnvironment();

const fallbackSecret = "development-only-secret-that-must-never-be-used-in-production";

export const isNeonAuthConfigured = Boolean(
  process.env.NEON_AUTH_BASE_URL && process.env.NEON_AUTH_COOKIE_SECRET,
);

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL ?? "http://localhost:3000",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET ?? fallbackSecret,
    // OAuth returns from Google as a top-level cross-site navigation. Strict
    // cookies would drop Neon Auth's verifier before the proxy can exchange it.
    sameSite: "lax",
  },
});
