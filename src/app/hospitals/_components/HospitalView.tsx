import { useGetHospitalsQuery } from "@/store/service/hospital.service";
import HospitalCard from "./HospitalCard";

export interface Hospital {
  hospital_id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}


export default function HospitalView() {
  const pagination = { page: 1, limit: 9, search: "" };
  const { data: hospitalCardData, isLoading } =
    useGetHospitalsQuery(pagination);
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-[#016b83] pb-1">Our Hospitals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
          {hospitalCardData?.data?.map((hospital: Hospital) => (
            <HospitalCard
              key={hospital.hospital_id}
              hospital={hospital}
            />
          ))}
        </div>
      </div>
    </>
  );
}
