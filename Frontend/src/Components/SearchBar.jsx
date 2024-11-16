import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className='flex items-center justify-center'>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search cars..."
        onChange={(e) => onSearch(e.target.value)} // Pass search value to parent
        className=" px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[30%]"
      />
    </div>
  );
};

export default SearchBar;
