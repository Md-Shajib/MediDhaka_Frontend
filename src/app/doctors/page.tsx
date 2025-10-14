"use client";
import { useGetDoctorsQuery } from "@/store/service/doctor.service";
import WebLayout from "../layout/web_layout";
import DoctorView from "./_components/DoctorView";

export default function DoctorsPage() {
  const { data, error, isLoading } = useGetDoctorsQuery();
  return (
    <>
      <WebLayout>
        <div className="px-3 sm:px-0 py-5 sm:py-0">
        <h2>Our Doctors</h2>
        <DoctorView />
      </div>
      </WebLayout>
    </>
  );
}
