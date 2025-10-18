"use client";
import Image from "next/image";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { memo } from "react";
import type { Hospital } from "./HospitalView";

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard = memo(({ hospital }: HospitalCardProps) => {
  const formattedDate = new Date(hospital.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer">
      {/* Hospital Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={hospital.image_url || "/images/default-hospital.jpg"}
          alt={`${hospital.name} - Hospital Building`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Hospital Info */}
      <div className="flex flex-col flex-grow px-5 pt-5 pb-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {hospital.name}
        </h3>
        
        <div className="space-y-2 text-sm">
          {hospital.address && (
            <p className="flex items-start gap-2 text-gray-600 leading-relaxed">
              <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="line-clamp-2">{hospital.address}</span>
            </p>
          )}

          {hospital.phone_number && (
            <a 
              href={`tel:${hospital.phone_number}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <span>{hospital.phone_number}</span>
            </a>
          )}

          {hospital.email && (
            <a 
              href={`mailto:${hospital.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{hospital.email}</span>
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar size={14} className="text-gray-400" aria-hidden="true" />
          <time dateTime={hospital.updated_at}>
            Updated: {formattedDate}
          </time>
        </div>
        
        <button 
          className="text-blue-600 text-sm font-semibold hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full"
          aria-label={`View details for ${hospital.name}`}
        >
          View Details
        </button>
      </div>
    </article>
  );
});

HospitalCard.displayName = "HospitalCard";

export default HospitalCard;