"use client";

import Image from "next/image";
import { Mail, Phone, Hospital, User } from "lucide-react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  img_url?: string;
  hospital: string;
  phone?: string;
  email?: string;
  image?: string;
}

export default function DoctorCard({
  name,
  specialty,
  img_url,
  hospital,
  phone,
  email,
}: DoctorCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300">
      <div className="flex items-center gap-5">
        {/* Doctor Image */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300 group-hover:border-blue-300 transition-all duration-300">
          {img_url ? (
            <Image src={img_url} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
              <User size={32} />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm font-medium text-blue-600">{specialty}</p>

          <div className="relative flex flex-col mt-2 text-sm text-gray-600 gap-1 pt-2">
            {hospital && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Hospital size={16} className="text-gray-500" />
                <span>{hospital}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gray-500" />
                <span>{phone}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-gray-500" />
                <span>{email}</span>
              </div>
            )}
            <span className="absolute inset-x-0 top-0 h-[1px] bg-gray-300 scale-x-100 group-hover:bg-gray-400 transition-all duration-300 origin-left"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
