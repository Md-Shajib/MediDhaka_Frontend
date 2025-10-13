
import DoctorSection from "@/components/DoctorSection";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/Hero";
import HospitalSection from "@/components/HospitalSection";
import Navbar from "@/components/navbar/Navbar";
import OurSpecialist from "@/components/ourSpecialist/our_specialist";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurSpecialist />
      <DoctorSection />
      <HospitalSection />
      <Footer />
    </>
  );
}
