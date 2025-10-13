import { NAV_LINKS } from "@/constant/navbar";
import { Search } from "lucide-react";
import Link from "next/link";

export default function MobileNav({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean,
  setMenuOpen: (open: boolean) => void
}) {
  return (
    <>
      <div
        className={`md:hidden bg-white transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 gap-3">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Search Input (Mobile) */}
          <div className="relative w-11/12 mt-2">
            <input
              type="search"
              placeholder="Search doctor or hospital"
              className="w-full pl-5 pr-10 py-2 text-sm text-gray-700 rounded-full border border-gray-300 shadow-sm outline-none 
              transition-all duration-300 bg-white hover:shadow-md"
            />
            <Search
              size={18}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            />
          </div>

          <button className="mt-3 w-11/12 text-sm bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>
    </>
  );
}
