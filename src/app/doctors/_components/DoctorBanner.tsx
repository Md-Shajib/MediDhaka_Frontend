"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";

interface DoctorBannerProps {
  title: string;
  image: string;
  searchSuggestion?: {
    item: string;
  }[];
}

export default function DoctorBanner({
  title,
  image,
  searchSuggestion,
}: DoctorBannerProps) {
  const [search, setSearch] = useState("");

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="h-[240px] w-full bg-cover bg-center rounded-xl flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 relative"
    >
      <h1 className="text-white text-lg md:text-xl font-semibold bg-black/60 border border-white rounded-full py-2 px-6 text-center">
        {title}
      </h1>

      {/* Search Box */}
      <div className="flex w-full max-w-3xl bg-white rounded-full shadow-md mt-5 overflow-hidden">
        <input
          type="text"
          placeholder="Search for doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-base outline-none border-none"
        />

        <div className="flex items-center gap-2 px-4 border-l border-gray-300">
          <MapPin size={18} className="text-gray-500" />
          <span className="text-sm text-gray-600">Location</span>
        </div>

        <button
          className="bg-[#006466] hover:bg-[#005055] text-white px-6 py-2 flex items-center gap-2 rounded-r-full transition-all"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Search Suggestions */}
      {searchSuggestion && searchSuggestion.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {searchSuggestion.map((suggestion, i) => (
            <div
              key={i}
              className="bg-black/20 px-4 py-1.5 rounded-full text-sm text-white"
            >
              {suggestion.item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
