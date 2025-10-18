"use client";
import { useState } from "react";
import Image from "next/image";
import { Edit2, Trash2, Search, Award } from "lucide-react";
import { useGetDoctorsQuery, useDeleteDoctorMutation } from "@/store/service/doctor.service";
import { Doctor } from "@/types/doctor";
import { number } from "framer-motion";

interface DoctorTableProps {
  onEdit: (doctorId: number) => void;
}

export default function DoctorTable({ onEdit }: DoctorTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: response, isLoading, refetch } = useGetDoctorsQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
  });

  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

  const doctors = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / 10);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        alert("Failed to delete doctor. Please try again.");
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors by name, specialty, or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Doctor</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Specialty</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Experience</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Updated</th>
              <th className="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor: Doctor) => (
                <tr
                  key={doctor.doctor_id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Doctor Info */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-purple-100">
                        <Image
                          src={doctor.image_url || "/images/default-doctor.jpg"}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          Dr. {doctor.name}
                        </p>
                        <p className="text-sm text-gray-500">ID: {doctor.doctor_id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Specialty */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-purple-600" />
                      <span className="text-sm text-gray-900 font-medium">
                        {doctor.specialty}
                      </span>
                    </div>
                  </td>

                  {/* Experience */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      {doctor.years_experience} years
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{doctor.phone_number}</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {doctor.email}
                      </p>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">
                      {new Date(doctor.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(doctor.doctor_id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.doctor_id)}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}