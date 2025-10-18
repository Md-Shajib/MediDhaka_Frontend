"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import WebLayout from "@/app/layout/web_layout";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  ArrowLeft,
  Building2,
  Share2,
} from "lucide-react";
import { useGetHospitalsByIdQuery } from "@/store/service/hospita.service";
import { data } from "framer-motion/client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HospitalDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const hospitalId = parseInt(id);

  const { data: hospital, isLoading, isError } = useGetHospitalsByIdQuery(hospitalId);

  console.log("Hospital Detail Data:", hospitalId);

  if (isLoading) {
    return (
      <WebLayout>
        <div className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <HospitalDetailSkeleton />
          </div>
        </div>
      </WebLayout>
    );
  }

  if (isError || !hospital) {
    return (
      <WebLayout>
        <div className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center py-16 bg-red-50 rounded-xl border border-red-200">
              <Building2 className="w-16 h-16 mx-auto text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hospital Not Found
              </h2>
              <p className="text-red-600 mb-6">
                The hospital you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/hospitals"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Hospitals
              </Link>
            </div>
          </div>
        </div>
      </WebLayout>
    );
  }

  const formattedCreated = new Date(hospital.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedUpdated = new Date(hospital.updated_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hospital.name,
          text: `Check out ${hospital.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <WebLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/hospitals"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Hospitals</span>
          </Link>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-96 w-full bg-gray-200">
              <Image
                src={hospital.image_url || "/images/default-hospital.jpg"}
                alt={hospital.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                aria-label="Share hospital"
              >
                <Share2 size={20} className="text-gray-700" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {hospital.name}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 size={24} className="text-blue-600" />
                  Contact Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600 leading-relaxed">{hospital.address}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone size={24} className="text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a
                        href={`tel:${hospital.phone_number}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {hospital.phone_number}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail size={24} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${hospital.email}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors break-all"
                      >
                        {hospital.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours (Example) */}
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock size={24} className="text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Operating Hours</h3>
                      <p className="text-gray-600">Open 24 Hours</p>
                      <p className="text-sm text-gray-500 mt-1">Emergency services available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-gray-600" />
                  Record Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Created:</span>
                    <time dateTime={hospital.created_at}>{formattedCreated}</time>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Last Updated:</span>
                    <time dateTime={hospital.updated_at}>{formattedUpdated}</time>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a
                  href={`tel:${hospital.phone_number}`}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Phone size={20} />
                  Call Now
                </a>
                <a
                  href={`mailto:${hospital.email}`}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Mail size={20} />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}

// Loading Skeleton
function HospitalDetailSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-96 bg-gray-200" />
      <div className="p-8 space-y-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}