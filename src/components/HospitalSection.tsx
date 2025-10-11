'use client';

import { HospitalData } from '@/constant/hospitals';
import HospitalCard from './HospitalCard';
import { Hospital } from '@/models/interfaces';
// import { useGetHospitalsQuery } from '@/features/hospital/hospitalApi';

const HospitalSection = () => {
//   const { data: hospitals, isLoading, isError } = useGetHospitalsQuery();

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Hospitals in Dhaka</h2>
        <p className="text-gray-700 mb-8">
          Explore trusted hospitals and healthcare centers near you.
        </p>

        {/* {isLoading && <p>Loading hospitals...</p>}
        {isError && <p className="text-red-500">Failed to load hospitals.</p>} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HospitalData?.map((hospital: Hospital) => (
            <HospitalCard
              key={hospital.id}
              name={hospital.name}
              location={hospital.location}
              phone={hospital.phone}
              email={hospital.email}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalSection;
