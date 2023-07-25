// SearchForm.tsx
import React, { useState } from "react";
import "../styles.css";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={query}
        onChange={handleChange}
        placeholder="Search GIFs"
      />
    &nbsp;&nbsp;&nbsp;
      <button type="submit" className="button">
        Search
      </button>
      
    </form>
  );
};

export default SearchForm;
