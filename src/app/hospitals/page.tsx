"use client";
import Tags from "./_components/Tags";
import WebLayout from "../layout/web_layout";
import Navbar from "@/components/navbar/Navbar";
import HospitalView from "./_components/HospitalView";
import { hospitalCarouselData } from "@/constant/hospitals";
import { HospitalTags as tags } from "@/constant/hospitals";
import HospitalCarousel from "./_components/HospitalCarousel";

export default function HospitalPage() {
  return (
    <>
      <Navbar />
      <WebLayout>
        <Tags tags={tags} search={true} />
        <HospitalCarousel carouselData={hospitalCarouselData} />
        <HospitalView />
      </WebLayout>
    </>
  );
}
