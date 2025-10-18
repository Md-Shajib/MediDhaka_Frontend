"use client";
import { hospitalCarouselData } from "@/constant/hospitals";
import { HospitalTags as tags } from "@/constant/hospitals";
import WebLayout from "../layout/web_layout";
import HospitalCarousel from "./_components/HospitalCarousel";
import HospitalView from "./_components/HospitalView";
import Tags from "./_components/Tags";
import Navbar from "@/components/navbar/Navbar";

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
