"use client";
import Link from "next/link";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  const baseClasses = "border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out";
  const inactiveClasses = "border-transparent text-gray-500 hover:border-primary hover:text-secondary font-medium";
  const activeClasses = "border-primary text-primary font-semibold";

  const getLinkClasses = (href: any) => {
    const isActive = pathname === href;
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard">
              <Image
                src="/images/medi-logo.png"
                alt="MediDhaka"
                width={140}
                height={100}
                className="object-contain"
              />
            </Link>
          </div>

          <div className="sm:ml-6 flex space-x-8">
            <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
              <span className="font-semibold text-[17px]">Hospitals</span>
            </Link>
            <Link href="/dashboard/doctors" className={getLinkClasses("/dashboard/doctors")}>
              <span className="font-semibold text-[17px]">Doctors</span>
            </Link>
          </div>

          <div className="flex items-center">
            <button className="hidden md:inline-block btn-primary text-sm px-4 py-2.5 rounded-md hover:bg-blue-700 transition">
              <span className="flex gap-3 items-center ">
                Get Started
                <MoveUpRight size={16} />
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
