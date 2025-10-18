"use client";
import { Stethoscope, TrendingUp, Award, Users } from "lucide-react";
import { useGetDoctorsQuery } from "@/store/service/doctor.service";

export default function DoctorDashboardStats() {
  const { data: response } = useGetDoctorsQuery({ page: 1, limit: 1000, search: "" });
  
  const totalDoctors = response?.total || 0;
  const recentlyAdded = 3;
  const specialists = Math.floor(totalDoctors * 0.6);

  const stats = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Specialists",
      value: specialists,
      icon: Award,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Recently Added",
      value: recentlyAdded,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Active Staff",
      value: totalDoctors,
      icon: Users,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon size={24} className={stat.textColor} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}