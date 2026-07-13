"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signInWithGoogle } from "@/app/admin/login/actions";

const initialState: { error?: string } = {};

const errorMessages: Record<string, string> = {
  configuration: "Admin login is not configured yet.",
  oauth: "Google sign in could not be completed. Try again.",
  unauthorized: "This Google account is not allowed to access admin.",
};

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(signInWithGoogle, initialState);
  const queryError = searchParams.get("error");
  const errorMessage = state.error || (queryError ? errorMessages[queryError] : undefined);

  return (
    <form action={formAction} className="w-full max-w-md border border-white/10 bg-[#111] p-8 rounded-lg space-y-6">
      <div>
        <p className="text-[#FF7A00] text-sm uppercase tracking-[0.2em]">AL Cafe & Lounge</p>
        <h1 className="text-3xl font-semibold mt-2">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">Use the Google account approved for menu administration.</p>
      </div>
      {errorMessage && <p className="text-sm text-red-400" role="alert">{errorMessage}</p>}
      <button type="submit" disabled={pending} className="flex w-full items-center justify-center gap-3 rounded bg-white px-4 py-3 font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-60">
        <span aria-hidden="true" className="text-lg font-semibold">G</span>
        {pending ? "Opening Google..." : "Continue with Google"}
      </button>
    </form>
  );
}
