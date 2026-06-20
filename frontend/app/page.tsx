import MapWrapper from "../src/components/MapWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-2">
        Convoy
      </h1>

      <p className="text-gray-500 mb-6">
        Travel together.
      </p>

      <div className="mb-6">
        <Link
          href="/saved-routes"
          className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          Saved Routes
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <MapWrapper />
        </div>
      </div>
    </main>
  );
}