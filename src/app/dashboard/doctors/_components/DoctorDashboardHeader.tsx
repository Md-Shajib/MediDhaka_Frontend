"use client";
import { Stethoscope, Plus } from "lucide-react";

interface DoctorDashboardHeaderProps {
  onAddNew: () => void;
}

export default function DoctorDashboardHeader({ onAddNew }: DoctorDashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
          <Stethoscope size={28} className="text-gray-200" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Doctor Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your medical professionals
          </p>
        </div>
      </div>

      <button
        onClick={onAddNew}
        className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-gray-200 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
        Add New Doctor
      </button>
    </div>
  );
}