"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface TagsProp {
  tags: string[];
  search: boolean;
}

export default function Tags({ tags, search }: TagsProp) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-wrap gap-2 items-center mt-5">
      <span className="text-[16px] font-medium text-gray-700 mr-1 whitespace-nowrap">
        Tags:
      </span>

      {tags?.map((tag) => (
        <span
          key={tag}
          className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition cursor-default"
        >
          {tag}
        </span>
      ))}

      {search && (
        <div className="ml-auto relative">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-[200px] py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
