"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

// static data
import { doctors } from "@/constant/doctors";
import DoctorBanner from "./DoctorBanner";


const doctorBannerData = {
  title: "Find the Best Doctors Near You",
  image: "/images/doctors/banner_bg.png",
  searchPlaceholder: "Search for doctors",
  locationLabel: "Dhaka, Bangladesh",
  searchSuggestion: [
    { item: "Cardiologist" },
    { item: "Dermatologist" },
    { item: "Neurologist" },
    { item: "Dentist" },
    { item: "Pediatrician" },
  ],
};


export default function DoctorView() {
  const [page, setPage] = useState(1);
  const limit = 9;
  const totalPages = Math.ceil(doctors.length / limit);
  const start = (page - 1) * limit;
  const currentDoctors = doctors.slice(start, start + limit);

  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentDoctors.length === 0) {
      timer = setTimeout(() => setShowEmpty(true), 500);
    } else {
      setShowEmpty(false);
    }
    return () => clearTimeout(timer);
  }, [currentDoctors]);

  return (
    <div className="mt-6 mb-12">
      {/* Doctor Banner */}
      <div className="mb-10">
        <DoctorBanner title={doctorBannerData.title} image={doctorBannerData.image} searchSuggestion={doctorBannerData.searchSuggestion}/>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {currentDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* Empty State */}
      {showEmpty && (
        <div className="w-full text-center py-10">
          <Image
            src="/images/service/no_service.jpg"
            alt="No doctors found"
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-lg"
          />
          <p className="text-lg text-gray-600">No doctors found</p>
        </div>
      )}

      {/* Pagination */}
      {doctors.length > limit && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                page === i + 1
                  ? "bg-[#006466] text-white"
                  : "text-gray-600 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
