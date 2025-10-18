"use client";
import { useGetDoctorsQuery } from "@/store/service/doctor.service";
import WebLayout from "../layout/web_layout";
import DoctorView from "./_components/DoctorView";
import Navbar from "@/components/navbar/Navbar";

export default function DoctorsPage() {
  const { data, error, isLoading } = useGetDoctorsQuery();
  return (
    <>
      <Navbar />
      <WebLayout>
        <div className="px-3 sm:px-0 py-5 sm:py-0">
        <DoctorView />
      </div>
      </WebLayout>
    </>
  );
}
