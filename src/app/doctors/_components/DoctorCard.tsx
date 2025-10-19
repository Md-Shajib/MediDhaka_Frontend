"use client";
import Image from "next/image";
import { Doctor } from "@/types/doctor";
import { CalendarDays, MapPin, Phone, Mail } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100">
      {/* Doctor Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={doctor.image_url || "/images/default-doctor.jpg"}
          alt={doctor.name}
          width={400}
          height={224}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#006466] transition-colors">
          {doctor.name}
        </h3>
        <p className="text-sm font-medium text-[#006466] mb-2">
          {doctor.specialty}
        </p>
        {doctor.phone_number && (
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <Phone size={15} /> {doctor.phone_number}
          </p>
        )}
        {doctor.email && (
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <Mail size={15} /> {doctor.email}
          </p>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-100">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays size={14} />
          {new Date(doctor.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <button className="text-[#006466] text-sm font-semibold border-b-2 border-transparent group-hover:border-[#006466] transition-all">
          View Profile
        </button>
      </div>
    </div>
  );
}
