'use client';

import Link from 'next/link';
import { NAV_LINKS } from '@/constant/navbar';
import { useToggle } from '@/hooks/useToggle';
import SearchPopup from '../SearchPopup';

export default function Navbar () {
  const { open, toggle, close } = useToggle();

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Dispatch Redux search action here
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 fixed top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MEDI-DHAKA
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-600">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <button
          onClick={toggle}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-2 flex flex-col gap-2">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-600">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Search Popup */}
      {open && <SearchPopup onClose={close} onSearch={handleSearch} />}
    </nav>
  );
};

