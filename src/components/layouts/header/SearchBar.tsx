import React, { useState, useEffect } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

const mockResults = [
  { id: 1, name: "Giày Sneaker Nam", image: "/images/default-image.png" },
  { id: 2, name: "Áo Hoodie Unisex", image: "/images/default-image.png" },
  { id: 3, name: "Túi Đeo Chéo Thời Trang", image: "/images/default-image.png" },
];

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = mockResults.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectSearch = (term) => {
    setSearchTerm(term);
    setIsSearchOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
    setSearchTerm('');
  };

  return (
    <>
      <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition">
        <SearchIcon size={20} className="text-gray-700" />
      </button>

      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsSearchOpen(true)}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />

        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-2 z-50 overflow-hidden">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div key={item.id} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover mr-3" />
                  <p className="text-sm">{item.name}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-2">Không tìm thấy sản phẩm nào</p>
            )}
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4 bg-white shadow-lg flex items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-12 pr-4 py-3 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition"
                autoFocus
                value={searchTerm}
                onChange={handleSearch}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <button onClick={handleCloseSearch} className="ml-6 p-2 hover:bg-gray-100 rounded-full transition">
              <XIcon size={24} className="text-gray-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-white shadow-md">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div key={item.id} className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectSearch(item.name)}>
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                  <p className="text-lg">{item.name}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;