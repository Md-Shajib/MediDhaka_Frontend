"use client";
import Link from "next/link";
import { X } from "lucide-react";
import debounce from "lodash.debounce";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetSearchQuery } from "@/store/service/search.service";

interface Props {
  onClose: () => void;
}

const SearchPopup: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // debounce the input
  const debounceQuery = React.useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val);
      }, 300), // 300ms delay
    []
  );

  useEffect(() => {
    debounceQuery(query);
  }, [query, debounceQuery]);

  // RTK Query hook for live search
  const { data, isLoading } = useGetSearchQuery(
    { query: debouncedQuery },
    { skip: !debouncedQuery } // skip API call if empty
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-start justify-center pt-24 bg-black/40 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="relative bg-[#ebeae9] w-full max-w-2xl mx-4 rounded-2xl shadow-2xl p-6"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
            Search Doctors or Hospitals
          </h2>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query..."
            className="w-full border border-gray-300 focus:border-blue-500 rounded-md px-4 py-3 text-gray-700 text-base shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition"
          />

          {/* Results */}
          {debouncedQuery && (
            <div className="mt-5 max-h-96 overflow-y-auto">
              {isLoading && (
                <p className="text-center text-gray-500">Loading...</p>
              )}

              {!isLoading && (
                <div className="grid grid-cols-1 gap-6">
                  {/* Doctors */}
                  {data?.data?.doctor?.length > 0 && (
                    <div>
                      <h3 className="text-md tracking-wider text-secondary mb-2">
                        Doctors
                      </h3>
                      <div className="space-y-2">
                        {data.data.doctor.slice(0, 3).map((d: any) => (
                          <div className=" mr-5 rounded-md bg-white hover:bg-gray-100  border border-gray-300">
                            <Link
                              href={`/doctors/${d.id}`}
                              key={d.id}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <img
                                src={d.image}
                                alt={d.name}
                                className="w-20 h-12 rounded-l-md object-cover"
                              />
                              <span className="text-gray-800">{d.name}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hospitals */}
                  {data?.data?.hospital?.length > 0 && (
                    <div>
                      <h3 className="text-md tracking-wider text-secondary mb-2">
                        Hospitals
                      </h3>
                      <div className="space-y-2">
                        {data.data.hospital.slice(0, 3).map((h: any) => (
                          <div
                            key={h.id}
                            className="flex items-center gap-3 mr-5 rounded-md bg-white hover:bg-gray-100 cursor-pointer border border-gray-300"
                          >
                            <Link
                              href={`/hospitals/${h.id}`}
                              key={h.id}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <img
                                src={h.image}
                                alt={h.name}
                                className="w-20 h-12 rounded-l-md object-cover"
                              />
                              <span className="text-gray-800">{h.name}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No results */}
                  {!data?.data?.doctor?.length &&
                    !data?.data?.hospital?.length && (
                      <p className="text-center text-gray-500 mt-4">
                        No results found.
                      </p>
                    )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchPopup;
