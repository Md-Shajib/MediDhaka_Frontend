"use client";
import { Building2, Plus } from "lucide-react";

interface DashboardHeaderProps {
  onAddNew: () => void;
}

export default function DashboardHeader({ onAddNew }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
          <Building2 size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hospital Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your healthcare network
          </p>
        </div>
      </div>

      <button
        onClick={onAddNew}
        className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
        Add New Hospital
      </button>
    </div>
  );
}