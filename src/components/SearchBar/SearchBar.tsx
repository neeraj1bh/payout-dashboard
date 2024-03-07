import React, { useState, FC } from "react";

import { SearchBarContainer, Icon, Input } from "./SearchBar.styled";
import { debounce } from "@/utils/debounce";
import { SearchIcon } from "@/assets";

interface Props {
  onChange: (value: string) => void;
}

const SearchBar: FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const debouncedSearch = debounce(onChange, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
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
