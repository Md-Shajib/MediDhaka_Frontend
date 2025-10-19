import WebLayout from "../layout/web_layout";
import Navbar from "@/components/navbar/Navbar";
import DoctorView from "./_components/DoctorView";

export default function DoctorsPage() {
  return (
    <>
      <Navbar />
      <WebLayout>
        <DoctorView />
      </WebLayout>
    </>
  );
}
