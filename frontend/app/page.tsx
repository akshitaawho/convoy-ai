import MapWrapper from "../src/components/MapWrapper";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        ConvoyAI
      </h1>

      <MapWrapper />
    </main>
  );
}