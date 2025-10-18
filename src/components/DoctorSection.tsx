'use client';

import { Doctor } from '@/models/interfaces';
import DoctorCard from './DoctorCard';
// import { useGetDoctorsQuery } from '@/features/doctor/doctorApi';
import { DoctorsData } from '@/constant/doctors';

const DoctorSection = () => {
//   const { data: doctors, isLoading, isError } = useGetDoctorsQuery(null);

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#ebf4ff]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Specialist</h2>
        <p className="text-gray-700 mb-8">
          Browse through our list of verified medical professionals.
        </p>

        {/* {isLoading && <p>Loading doctors...</p>}
        {isError && <p className="text-red-500">Failed to load doctors.</p>} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DoctorsData?.map((doc: Doctor) => (
            <DoctorCard
              key={doc.id}
              name={doc.name}
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
};

export default DoctorSection;
