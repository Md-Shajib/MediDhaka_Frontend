"use client";
import { useState } from "react";
import Image from "next/image";
import { Edit2, Trash2, Search, Eye } from "lucide-react";
import { useGetHospitalsQuery, useDeleteHospitalMutation } from "@/store/service/hospital.service";
import { Hospital } from "@/types/hospital";
import Link from "next/link";

interface HospitalTableProps {
  onEdit: (hospitalId: number) => void;
}

export default function HospitalTable({ onEdit }: HospitalTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: response, isLoading, refetch } = useGetHospitalsQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
  });

  const [deleteHospital, { isLoading: isDeleting }] = useDeleteHospitalMutation();

  const hospitals = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / 10);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      try {
        await deleteHospital(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete hospital:", error);
        alert("Failed to delete hospital. Please try again.");
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
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
            placeholder="Search hospitals by name, address, or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Hospital</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Updated</th>
              <th className="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital: Hospital) => (
                <tr
                  key={hospital.hospital_id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Hospital Info */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={hospital.image_url || "/images/default-hospital.jpg"}
                          alt={hospital.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {hospital.name}
                        </p>
                        <p className="text-sm text-gray-500">ID: {hospital.hospital_id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{hospital.phone_number}</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {hospital.email}
                      </p>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700 line-clamp-2 max-w-[250px]">
                      {hospital.address}
                    </p>
                  </td>

                  {/* Updated */}
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">
                      {new Date(hospital.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/hospitals/${hospital.hospital_id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => onEdit(hospital.hospital_id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(hospital.hospital_id)}
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
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No hospitals found
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