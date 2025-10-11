'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
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
          <img
            src="https://static.vecteezy.com/system/resources/previews/038/252/707/non_2x/hospital-building-illustration-medical-clinic-isolated-on-white-background-vector.jpg"
            alt="Healthcare illustration"
            className="w-full max-w-md mx-auto md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
