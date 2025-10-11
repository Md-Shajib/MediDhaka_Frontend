import React from 'react';

interface Props {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchPopup: React.FC<Props> = ({ onClose, onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Search</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Search doctors or hospitals..."
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSearch} className="px-4 py-2 text-sm bg-blue-600 text-white rounded">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
