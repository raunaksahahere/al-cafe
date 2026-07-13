import { Suspense } from "react";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/app/admin/login/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function AdminLoginFallback() {
  return (
    <div className="w-full max-w-md border border-white/10 bg-[#111] p-8 rounded-lg space-y-6">
      <div>
        <p className="text-[#FF7A00] text-sm uppercase tracking-[0.2em]">AL Cafe & Lounge</p>
        <h1 className="text-3xl font-semibold mt-2">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">Loading secure sign in...</p>
      </div>
    </div>
  );
}

export default async function AdminLoginPage() {
  const admin = await getAdminSession();
  if (admin) redirect("/admin");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Suspense fallback={<AdminLoginFallback />}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
