"use client";
import DoctorCard from "./DoctorCard";
import { DoctorData } from "@/types/doctor";
import { DoctorsData } from "@/constant/doctors";

export default function DoctorSection() {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#ebf4ff]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-4">Our Specialist</h2>
        <p className="text-gray-700 mb-8">
          Browse through our list of verified medical professionals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DoctorsData?.map((doc: DoctorData) => (
            <DoctorCard
              key={doc.id}
              name={doc.name}
              img_url={doc.img_url}
              specialty={doc.specialty}
              hospital={doc.hospitalName}
              phone={doc.phone}
              email={doc.email}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
