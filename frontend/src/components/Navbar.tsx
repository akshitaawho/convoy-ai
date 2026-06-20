"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between mb-6">
      <Link
        href="/"
        className="text-3xl font-bold"
      >
        Convoy
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/saved-routes"
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          My Routes
        </Link>

        <button
          className="w-10 h-10 rounded-full bg-[#FF856D] text-white font-semibold"
        >
          A
        </button>
      </div>
    </nav>
  );
}