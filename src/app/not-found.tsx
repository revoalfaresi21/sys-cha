import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050008] px-4 font-mono text-white">
      <section className="w-full max-w-md border border-[#ff73c7]/40 bg-black/80 p-8 text-center shadow-[0_0_44px_rgba(255,20,147,0.25)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[#ff73c7]/70">
          route_not_found
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#ffe6f7] drop-shadow-[0_0_18px_rgba(255,115,199,0.7)]">
          404
        </h1>
        <p className="mt-3 text-sm text-[#ffbde5]/70">
          Access path tidak ditemukan di Heart.OS.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block border border-[#ff73c7]/60 bg-[#ff1493] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(255,20,147,0.35)] transition hover:bg-[#ff73c7]"
        >
          back to login
        </Link>
      </section>
    </main>
  );
}
