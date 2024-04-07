import React, { useState } from "react";
import { Search } from "lucide-react";

interface ISearchBar {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit?: () => void
}

const SearchBar = ({ search, handleSubmit, handleChange }: ISearchBar) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [search, setSearch] = useState('');

  const handleSearch = () => {
    handleSubmit && handleSubmit()
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between gap-2 items-center mb-2">
      <div className="text-white font-semibold text-md">Mumbai, India</div>
      {isOpen ? (
        <div className="flex justify-between items-center gap-1">
          <input type="text" name="search" placeholder="Search city here..." className="h-8 border border-white text-sm bg-transparent rounded-lg pl-1 placeholder:pl-1 placeholder:text-white" value={search} onChange={handleChange} />
          <Search className="w-4 h-4 text-slate-300" onClick={handleSearch} />
        </div>
      ) : (
        <Search className="w-4 h-4 text-white" onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
};

export default SearchBar;
