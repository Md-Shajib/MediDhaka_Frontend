"use client";
import { useState } from "react";
import WebLayout from "../layout/web_layout";
import DashboardNav from "@/components/navbar/DashboardNav";
import DashboardHeader from "./_components/DashboardHeader";
import HospitalTable from "./_components/hospitals/HospitalTable";
import DashboardStats from "./_components/hospitals/DashboardStats";
import HospitalFormModal from "./_components/hospitals/HospitalFormModal";

export default function DashboardHospitalPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<number | null>(null);

  const handleAddNew = () => {
    setEditingHospital(null);
    setIsFormOpen(true);
  };

  const handleEdit = (hospitalId: number) => {
    setEditingHospital(hospitalId);
    console.log("Editing hospital ID:", hospitalId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHospital(null);
  };

  return (
    <>
    <DashboardNav />
    <WebLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <DashboardHeader onAddNew={handleAddNew} />

          {/* Stats */}
          <DashboardStats />

          {/* Hospital Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <HospitalTable onEdit={handleEdit} />
          </div>

          {/* Form Modal */}
          <HospitalFormModal
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            hospitalId={editingHospital}
          />
        </div>
      </div>
    </WebLayout>
    </>
  );
}
