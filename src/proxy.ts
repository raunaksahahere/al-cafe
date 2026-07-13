import { NextResponse, type NextRequest } from "next/server";
import { auth, isNeonAuthConfigured } from "@/lib/auth";

const protectAdmin = auth.middleware({ loginUrl: "/admin/login" });

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Server Actions expect Next.js's Flight response. Let the action perform
  // its own authorization instead of having the proxy turn its POST into a
  // redirect response.
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }

  if (!isNeonAuthConfigured) {
    return NextResponse.redirect(new URL("/admin/login?error=configuration", request.url));
  }

  return protectAdmin(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
