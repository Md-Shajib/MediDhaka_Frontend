"use client";
import WebLayout from "../layout/web_layout";
import Navbar from "@/components/navbar/Navbar";
import DoctorView from "./_components/DoctorView";

export default function DoctorsPage() {
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
