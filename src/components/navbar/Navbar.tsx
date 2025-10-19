"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileNav from "./MobileNav";
import SearchPopup from "../SearchPopup";
import { useToggle } from "@/hooks/useToggle";
import { NAV_LINKS } from "@/constant/navbar";
import { Menu, MoveUpRight, Search, X } from "lucide-react";

export default function Navbar() {
  const { open, toggle, close } = useToggle(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full bg-[#eef5f9] shadow-md px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/medi-logo.png"
            alt="MediDhaka"
            width={140}
            height={100}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex relative w-1/3 lg:w-1/4">
          <input
            onClick={toggle}
            type="search"
            placeholder="Search by doctor or hospital"
            className="w-full pl-5 pr-10 py-2 text-sm text-gray-700 rounded-full border border-gray-300 shadow-sm outline-none 
            transition-all duration-300 bg-white hover:shadow-md"
          />
          <Search
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        {/* Button (Desktop) */}
        <button className="btn-primary hidden md:inline-block text-sm text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition">
          <span className="flex gap-3 items-center ">
            Get Started
            <MoveUpRight size={16} />
          </span>
        </button>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {open && <SearchPopup onClose={close} />}
    </nav>
  );
}
