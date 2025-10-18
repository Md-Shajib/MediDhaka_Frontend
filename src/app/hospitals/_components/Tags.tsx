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
    <div className="p-2 md:p-0 md:flex my-5 w-full items-center gap-4">
      <div className="flex max-w-full md:max-w-4/5  flex-wrap gap-2 items-center">
        <span className="text-2xl font-bold text-[#016b83] pb-1 mr-1 whitespace-nowrap">
          Tags:
        </span>

        {tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 hover:bg-gray-100  transition duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {search && (
        <div className="ml-auto relative mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search by hospital name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
