"use client";

import { useDebouncedCallback } from 'use-debounce';
import { useRef, KeyboardEvent } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchComponentProps {
  searchQuery:string;
  onTextChange: (text: string) => void;
  onSearch: () => void;
};

export default function SearchComponent({searchQuery, onTextChange, onSearch}: SearchComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useDebouncedCallback((value) => {
      onSearch();
    },
    500,
    { maxWait: 2000 }
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      onSearch();
    }
  };

  const handleClear = () => {
    onTextChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mr-2">
      <div className="relative flex items-center">
        <input
          type="text"
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => {
            debounced(e.target.value);
            onTextChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search ..."
          className="backdrop-blur-md bg-white/30 w-full py-2 pl-4 pr-12 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-10 p-1 text-white hover:text-gray-700 focus:outline-none"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
        
        <button
          onClick={handleSearch}
          disabled={!searchQuery.trim()}
          className={`absolute right-2 p-1 rounded-full ${searchQuery.trim() ? "text-white hover:text-blue-800" : "text-gray-400"} focus:outline-none`}
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}