import React, { useState } from "react";
import "../Movies.css";

interface SearchFormProps {
  initialQuery: string;
  onSearch: (searchQuery: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery, onSearch }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input type="text" className="search-input" placeholder="Search..." value={query} onChange={handleSearch} />
    </form>
  );
};

export default SearchForm;
