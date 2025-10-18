'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Find the Right Doctor & Hospital in Dhaka
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            Search, compare, and connect with trusted healthcare professionals near you.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <Link
              href="/doctors"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Explore Doctors
            </Link>
            <Link
              href="/hospitals"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              View Hospitals
            </Link>
          </div>
        </div>

        {/* Optional Image */}
        <div className="flex-1">
          <Image
            src="/images/hero_bg.png"
            alt="Healthcare illustration"
            width={200}
            height={200}
            className="w-full max-w-md mx-auto md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
