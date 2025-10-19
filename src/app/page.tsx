
import ArticleSection from "@/components/ArticleSection";
import DoctorSection from "@/components/DoctorSection";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/Hero";
import HospitalSection from "@/components/HospitalSection";
import Navbar from "@/components/navbar/Navbar";
import OurSpeciality from "@/components/ourSpecialist/our_specialist";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurSpeciality />
      <ArticleSection />
      <DoctorSection />
      <Footer />
    </>
  );
}
