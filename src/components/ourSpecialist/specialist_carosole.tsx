"use client";

import "swiper/css";
import { JSX } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  title: string;
  icon: JSX.Element;
}

interface SpecialistCarouselProps {
  carouselData: CarouselItem[];
}

export default function SpecialistCarousel({
  carouselData,
}: SpecialistCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        spaceBetween={20}
        loop={false}
        navigation={{
          nextEl: ".specialist-swiper-next",
          prevEl: ".specialist-swiper-prev",
        }}
        modules={[Navigation]}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        onSwiper={(swiper) => {
          console.log("Active breakpoint:", swiper.currentBreakpoint);
          console.log("Slides per view:", swiper.params.slidesPerView);
        }}
        className="specialist-swiper !max-w-[20rem] md:!max-w-[30rem] lg:!max-w-full"
      >
        {carouselData.map((carousel, index) => (
          <SwiperSlide key={index} className="!max-w-full">
            <div className="max-w-full flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm rounded-md p-6 min-h-[10rem]">
              <div className="flex flex-col gap-2 text-center items-center">
                {carousel.icon}
                <p className="text-sm font-medium text-gray-700">
                  {carousel.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="!hidden md:!flex">
          <button className="specialist-swiper-prev !absolute top-1/2 -translate-y-1/2 z-10 left-0 px-1 py-3 bg-gray-200 text-gray-800 shadow rounded-r hover:bg-primary hover:text-[#0d8fab]">
            <ChevronLeft size={21} />
          </button>
          <button className="specialist-swiper-next !absolute top-1/2 -translate-y-1/2 z-10 right-0  px-1 py-3 bg-gray-200 text-gray-800 shadow rounded-l hover:bg-primary hover:text-[#0d8fab]">
            <ChevronRight size={21} />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
