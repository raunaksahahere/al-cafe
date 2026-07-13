import Link from "next/link";

export default function NotFound() {
  return <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 p-6 text-center"><p className="text-[#FF7A00] uppercase tracking-[0.25em] text-sm">404</p><h1 className="text-4xl font-semibold">Page not found</h1><Link href="/" className="rounded bg-[#FF7A00] px-5 py-3 font-medium">Return home</Link></main>;
}
