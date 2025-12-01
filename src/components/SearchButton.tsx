import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { BlackSearchIcon, BsX } from '../icons/SearchIcons';

interface SearchInputProps {
  initialQuery?: string;
}

export default function SearchButton({ initialQuery = '' }: SearchInputProps) {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const url = new URL(window.location.href);
    if (term.trim()) {
      url.searchParams.set('q', term.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
    
    window.dispatchEvent(new CustomEvent('search-change'));
  }, 150);

  const clearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
    handleSearch('');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <BlackSearchIcon />
      </div>
      <input
      aria-label='Busqueda'
        type="search"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          handleSearch(val);
        }}
        placeholder="¿Qué quieres escuchar?"
        className="w-full h-12 pl-14 pr-12 bg-[#181818] text-white rounded-full placeholder-gray-400 text-base font-medium focus:outline-none focus:bg-[#282828] focus:ring-2 focus:ring-white/20 hover:bg-[#282828] transition-all duration-200 caret-green-400
        
        [&::-webkit-search-cancel-button]:hidden
        [&::-webkit-search-results-decoration]:hidden
        "
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-4 flex items-center text-white/70 hover:text-white transition"
          aria-label="Limpiar búsqueda"
        >
          <BsX />
        </button>
      )}
    </div>
  );
}