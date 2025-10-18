"use client";
import { useState } from "react";
import WebLayout from "@/app/layout/web_layout";
import DoctorTable from "./_components/DoctorTable";
import DoctorFormModal from "./_components/DoctorFormModal";
import DoctorDashboardHeader from "./_components/DoctorDashboardHeader";
import DoctorDashboardStats from "./_components/DoctorDashboardStats";
import DashboardNav from "@/components/navbar/DashboardNav";

export default function DoctorsDashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<number | null>(null);

  const handleAddNew = () => {
    setEditingDoctor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (doctorId: number) => {
    setEditingDoctor(doctorId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDoctor(null);
  };

  return (
    <>
      <DashboardNav />
      <WebLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <DoctorDashboardHeader onAddNew={handleAddNew} />

            {/* Stats */}
            <DoctorDashboardStats />

            {/* Doctor Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <DoctorTable onEdit={handleEdit} />
            </div>

            {/* Form Modal */}
            <DoctorFormModal
              isOpen={isFormOpen}
              onClose={handleCloseForm}
              doctorId={editingDoctor}
            />
          </div>
        </div>
      </WebLayout>
    </>
  );
}
