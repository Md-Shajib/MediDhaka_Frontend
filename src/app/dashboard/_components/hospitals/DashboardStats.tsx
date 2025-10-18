"use client";
import { Building2, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useGetHospitalsQuery } from "@/store/service/hospital.service";

export default function DashboardStats() {
  const { data: response } = useGetHospitalsQuery({ page: 1, limit: 20, search: "" });
  console.log("DashboardStats response:", response);
  
  const totalHospitals = response?.total || 0;
  const recentlyAdded = 5; // You can calculate this based on created_at
  const activeHospitals = totalHospitals; // You can add status field to calculate

  const stats = [
    {
      title: "Total Hospitals",
      value: totalHospitals,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active",
      value: activeHospitals,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Recently Added",
      value: recentlyAdded,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Updated Today",
      value: 3,
      icon: Clock,
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