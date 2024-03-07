import React, { useState, FC } from "react";

import { SearchBarContainer, Icon, Input } from "./SearchBar.styled";
import { SearchIcon } from "@/assets";

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <SearchBarContainer>
      <Icon>
        <SearchIcon width={"20px"} height={"20px"} />
      </Icon>
      <Input
        type="text"
        placeholder="Search username..."
        onChange={handleSearch}
        value={value}
        className="searchInput"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
