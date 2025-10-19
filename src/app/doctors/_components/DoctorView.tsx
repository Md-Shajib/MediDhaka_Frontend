"use client";
import Image from "next/image";
import DoctorCard from "./DoctorCard";
import { Doctor } from "@/types/doctor";
import DoctorBanner from "./DoctorBanner";
import { useEffect, useState } from "react";
import { useGetDoctorsQuery } from "@/store/service/doctor.service";

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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    search: "",
  });

  const { data: DoctorData, isLoading } = useGetDoctorsQuery(pagination);

  const doctors: Doctor[] = DoctorData?.data || [];
  const totalDoctors = DoctorData?.total || 0;
  const totalPages = Math.ceil(totalDoctors / pagination.limit);

  const handleSearch = (value: string) => {
    setPagination((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const [showEmpty, setShowEmpty] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && doctors.length === 0) {
      timer = setTimeout(() => setShowEmpty(true), 400);
    } else {
      setShowEmpty(false);
    }
    return () => clearTimeout(timer);
  }, [doctors, isLoading]);

  return (
    <div className="mt-6 mb-12 px-3 sm:px-0 py-5 sm:py-0">
      {/* Doctor Banner */}
      <div className="mb-10">
        <DoctorBanner
          title={doctorBannerData.title}
          image={doctorBannerData.image}
          searchSuggestion={doctorBannerData.searchSuggestion}
          setSearch={handleSearch}
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-gray-500 py-10">Loading doctors...</p>
      )}

      {/* Empty State */}
      {!isLoading && showEmpty && (
        <div className="w-full text-center py-10">
          <Image
            src="/images/doctors/no-doctors.jpg"
            alt="No doctors found"
            width={120}
            height={120}
            className="mx-auto mb-4 rounded-lg"
          />
          <p className="text-lg text-gray-600">No doctors found</p>
        </div>
      )}

      {/* Doctor Cards */}
      {!isLoading && doctors.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.doctor_id} doctor={doctor} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    pagination.page === i + 1
                      ? "bg-[#006466] text-white"
                      : "text-gray-600 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={pagination.page === totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
