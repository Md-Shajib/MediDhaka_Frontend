
import DoctorSection from "@/components/DoctorSection";
import Hero from "@/components/hero/Hero";
import HospitalSection from "@/components/HospitalSection";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DoctorSection />
      <HospitalSection />
    </>
  );
}
