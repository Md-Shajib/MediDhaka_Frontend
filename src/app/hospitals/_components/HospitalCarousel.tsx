"use client";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export interface HospitalCarouselItem {
  id: number;
  profile_image: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  email: string;
  established_at: string;
}

export interface HospitalCarouselProps {
  carouselData: HospitalCarouselItem[];
  className?: string;
}

export default function HospitalCarousel({
  carouselData,
  className = "default",
}: HospitalCarouselProps) {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={{
          nextEl: `.hospital-swiper-next-${className}`,
          prevEl: `.hospital-swiper-prev-${className}`,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: `.hospital-swiper-pagination-${className}`,
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-[#006466] !rounded-full !mx-1 !inline-block transition-all duration-300 ease-in-out"></span>`;
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          0: { navigation: { enabled: false } },
          767: { navigation: { enabled: true } },
        }}
        className={`mySwiper !m-[-10px] hospital-swiper-${className}`}
        onSlideChangeTransitionStart={(swiper) => {
          swiper.slides.forEach((slide: any) => {
            const content = slide.querySelector(".slide-content");
            if (content) {
              content.classList.add("opacity-0", "translate-y-5");
              content.classList.remove("opacity-100", "translate-y-0");
            }
          });
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const content = activeSlide?.querySelector(".slide-content");
          if (content) {
            content.classList.remove("opacity-0", "translate-y-5");
            content.classList.add(
              "opacity-100",
              "translate-y-0",
              "transition-all",
              "duration-700",
              "ease-in-out"
            );
          }
        }}
      >
        {carouselData?.map((hospital, index) => (
          <SwiperSlide key={hospital.id} className="p-[10px]">
            <Link
            href="#"
              className="flex flex-col md:flex-row bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative md:w-7/12">
                <Image
                  src={hospital.profile_image || "/images/hospitals/default.jpg"}
                  alt={hospital.name}
                  width={580}
                  height={358}
                  className="w-full h-[200px] md:h-[280px] lg:h-[358px] object-cover rounded"
                />
              </div>

              {/* Content Section */}
              <div
                className={`slide-content flex flex-col justify-between md:w-5/12 p-4 md:p-10 transition-all duration-700 ease-in-out ${
                  index === 0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg md:text-[22px] lg:text-[28px] font-semibold text-[#006466]">
                    {hospital.name}
                  </h2>
                  <p className="text-sm md:text-lg font-medium text-gray-700">
                    {hospital.specialty}
                  </p>
                  {hospital.phone && (
                    <p className="text-sm text-gray-600">Phone: {hospital.phone}</p>
                  )}
                  {hospital.email && (
                    <p className="text-sm text-gray-600">Email: {hospital.email}</p>
                  )}
                  {hospital.address && (
                    <p className="text-sm text-gray-600"><span className="flex gap-2 items-center"><MapPin size={17}/> {hospital.address}</span></p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Established:{" "}
                    {new Date(hospital.established_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <button className="text-[#006466] font-semibold text-sm border-b-2 border-transparent hover:border-[#006466] transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="!hidden md:!flex">
          <button
            className={`hospital-swiper-prev-${className} absolute top-1/2 -translate-y-[50%] z-10 left-[10px] rounded-tr-md rounded-br-md bg-[#eee] text-[#212529] w-[34px] h-14 shadow-md flex items-center justify-center hover:bg-[#006466] hover:text-white transition-all`}
          >
            <ChevronLeft size={21} />
          </button>
          <button
            className={`hospital-swiper-next-${className} absolute top-1/2 -translate-y-[50%] z-10 right-[10px] rounded-tl-md rounded-bl-md bg-[#eee] text-[#212529] w-[34px] h-14 shadow-md flex items-center justify-center hover:bg-[#006466] hover:text-white transition-all`}
          >
            <ChevronRight size={21} />
          </button>
        </div>
      </Swiper>

      {/* Custom Pagination */}
      <div
        className={`hospital-swiper-pagination-${className} w-full flex justify-center mt-6`}
      ></div>
    </div>
  );
}
