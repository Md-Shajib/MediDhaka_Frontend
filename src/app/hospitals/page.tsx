import { hospitalCardData, hospitalCarouselData } from "@/constant/hospitals";
import WebLayout from "../layout/web_layout";
import HospitalCarousel from "./_components/HospitalCarousel";
import Tags from "./_components/Tags";
import { tags } from "@/constant/tags";
import HospitalCard, { HospitalCardProps } from "./_components/HospitalCard";

export default function HospitalPage() {
  return (
    <>
      <WebLayout>
        <div className="px-3 sm:px-0 py-5 sm:py-0">
          <h2>Our Hospitals</h2>
          <Tags tags={tags} search={true} />
          <HospitalCarousel carouselData={hospitalCarouselData}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                  {hospitalCardData.map((hospital: HospitalCardProps) => (
                    <HospitalCard key={hospital.hospital.id} hospital={hospital.hospital} />
                  ))}
                </div>
        </div>
      </WebLayout>
    </>
  );
}
