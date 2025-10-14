"use client";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export interface HospitalCardProps {
  hospital: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    cover_image: string;
    updated_at: string;
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer">
      {/* Hospital Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={hospital.cover_image || "/images/default-hospital.jpg"}
          alt={hospital.name}
          width={400}
          height={224}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Hospital Info */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
          {hospital.name}
        </h3>
        <p className="flex items-center gap-1 text-gray-600 text-sm mb-2">
          <MapPin size={15} className="text-gray-500" />
          {hospital.address}
        </p>

        {hospital.phone && (
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <Phone size={15} className="text-gray-500" />
            {hospital.phone}
          </p>
        )}
        {hospital.email && (
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <Mail size={15} className="text-gray-500" />
            {hospital.email}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Updated: {new Date(hospital.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <button className="text-primary text-sm font-semibold border-b-2 border-transparent group-hover:border-primary transition-all">
          View Details
        </button>
      </div>
    </div>
  );
}
