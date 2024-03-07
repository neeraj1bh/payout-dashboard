import { CaretDownIcon, CaretUpIcon } from "@/assets";
import { FC } from "react";
import { StyledHeader, StyledTh } from "./PayoutTable.styled";
import { SortOrder } from "./types";

interface TableHeaderProps {
  heading: string;
  sortOrder?: SortOrder;
  onClick?: () => void;
}

export const TableHeader: FC<TableHeaderProps> = ({ heading, sortOrder, onClick }) => {
  const caretIcon =
    sortOrder === "asc" ? (
      <CaretDownIcon width={"20px"} height={"20px"} />
    ) : (
      <CaretUpIcon width={"20px"} height={"20px"} />
    );
  return (
    <StyledTh onClick={onClick}>
      <StyledHeader>
        {heading}
        {sortOrder && caretIcon}
      </StyledHeader>
    </StyledTh>
  );
};
