import Image from "next/image";
import SpecialistCarousel from "./specialist_carosole";
import { OUR_SPECIALITIES } from "@/constant/our_specialist";

export default function OurSpeciality() {
  return (
    <>
      <section className="w-full px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="py-10 flex gap-5">
            <div className="hidden md:block rounded-md overflow-hidden">
              <Image
                src="/images/specialist-2.jpg"
                alt="Specialist"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                Our Speciality
              </h2>
              <div className="w-full max-w-4xl mx-auto overflow-hidden">
                <SpecialistCarousel carouselData={OUR_SPECIALITIES} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
