import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}
