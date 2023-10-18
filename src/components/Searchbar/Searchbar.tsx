import React, { useState } from "react";
import "./Searchbar.css";
import { BiSearch } from "react-icons/bi";

interface SearchbarProps {
  onSearch: (value: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <div className="search-container">
      <form className="form-search" onSubmit={handleSubmit}>
        <div className="search-panel">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search Sport Area"
            onChange={handleChange}
            className="search-field"
          />
          <button className="searchbar-button" type="submit">
            <BiSearch style={{ width: "15px", height: "15px" }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
