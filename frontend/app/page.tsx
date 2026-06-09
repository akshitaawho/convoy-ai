import MapWrapper from "../src/components/MapWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-2">
        Convoy
      </h1>

      <p className="text-gray-500 mb-6">
        Travel together.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <MapWrapper />
        </div>
      </div>
    </main>
  );
}