import "server-only";

const requiredProductionVariables = [
  "DATABASE_URL",
  "NEON_AUTH_BASE_URL",
  "NEON_AUTH_COOKIE_SECRET",
  "NEON_AUTH_ADMIN_EMAIL",
] as const;

export function validateProductionEnvironment() {
  if (process.env.NODE_ENV !== "production") return;

  const missing = requiredProductionVariables.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing required production environment variable(s): ${missing.join(", ")}.`);
  }
}
