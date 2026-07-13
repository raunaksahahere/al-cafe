"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 p-6 text-center"><p className="text-[#FF7A00] uppercase tracking-[0.25em] text-sm">Something went wrong</p><h1 className="text-4xl font-semibold">Please try again</h1><button onClick={reset} className="rounded bg-[#FF7A00] px-5 py-3 font-medium">Try again</button></main>;
}
