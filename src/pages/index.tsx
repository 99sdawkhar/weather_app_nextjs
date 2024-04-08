import Image from "next/image";
import { Inter } from "next/font/google";
import Banner from "@/components/Banner";
import CurrentDetails from "@/components/CurrentDetails";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <main
      className={`min-h-screen bg-[#F6EDFF] ${inter.className}`}
    >
      <Banner />
      <CurrentDetails />
      <Toaster />
    </main>
  );
}
