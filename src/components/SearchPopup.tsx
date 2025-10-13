"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchPopup: React.FC<Props> = ({ onClose, onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    onSearch(query);
    onClose();
  };

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
          className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
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
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Type your query..."
            className="w-full border border-gray-300 focus:border-blue-500 rounded-md px-4 py-3 text-gray-700 text-base shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="px-5 py-2 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchPopup;
