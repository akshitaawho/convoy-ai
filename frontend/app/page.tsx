import MapWrapper from "../src/components/MapWrapper";
import Navbar from "../src/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <Navbar />

      <MapWrapper />
    </main>
  );
}