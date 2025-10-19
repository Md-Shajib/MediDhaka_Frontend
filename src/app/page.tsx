import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/Navbar";
import DoctorSection from "@/components/DoctorSection";
import ArticleSection from "@/components/articles/ArticleSection";
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
