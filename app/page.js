import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col">
          <Navbar/>  // navbar section done checking 
          <Hero/>  // hero section done checking 
    </div>
  );
}
