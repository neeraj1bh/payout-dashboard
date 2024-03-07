import { formatDate } from "@/utils/formatDate";
import {
  StyledBody,
  StyledCell,
  StyledDate,
  StyledHeader,
  StyledRow,
  StyledStatus,
  StyledTable,
  StyledTh,
  StyledThead,
  StyledValue,
} from "./PayoutTable.styled";
import { FC, useState } from "react";
import { CaretUpIcon, CaretDownIcon } from "@/assets";

interface PayoutData {
  dateAndTime: string;
  status: "Pending" | "Completed";
  value: string;
  username: string;
}

interface Props {
  data: PayoutData[];
}

type SortOrder = "asc" | "desc";

interface TableHeaderProps {
  heading: string;
  sortOrder: SortOrder;
  handleClick: () => void;
}

export const TableHeader: FC<TableHeaderProps> = ({
  heading,
  sortOrder,
  handleClick,
}) => {
  const caretIcon =
    sortOrder === "asc" ? (
      <CaretDownIcon width={"20px"} height={"20px"} />
    ) : (
      <CaretUpIcon width={"20px"} height={"20px"} />
    );
  return (
    <StyledTh onClick={handleClick}>
      <StyledHeader>
        {heading}
        {caretIcon}
      </StyledHeader>
    </StyledTh>
  );
};

const PayoutTable: FC<Props> = ({ data }) => {
  const [sortBy, setSortBy] = useState<keyof PayoutData>("dateAndTime");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: keyof PayoutData) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = data.sort((a, b) => {
    let aValue, bValue;

    if (sortBy === "value") {
      aValue = parseFloat(a[sortBy].replace("$", "").replace(",", ""));
      bValue = parseFloat(b[sortBy].replace("$", "").replace(",", ""));
    } else {
      aValue = a[sortBy];
      bValue = b[sortBy];
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <StyledTable>
      <StyledThead>
        <StyledRow>
          <TableHeader
            handleClick={() => {
              handleSort("username");
            }}
            heading="Username"
            sortOrder={sortOrder}
          />
          <TableHeader
            handleClick={() => {
              handleSort("dateAndTime");
            }}
            heading="Date"
            sortOrder={sortOrder}
          />
          <TableHeader
            handleClick={() => {
              handleSort("status");
            }}
            heading="Status"
            sortOrder={sortOrder}
          />
          <TableHeader
            handleClick={() => {
              handleSort("value");
            }}
            heading="Value"
            sortOrder={sortOrder}
          />
        </StyledRow>
      </StyledThead>
      <StyledBody>
        {data.map((item, index) => (
          <StyledRow key={index}>
            <StyledCell>
              <StyledDate>{item?.username || "No Username"}</StyledDate>
            </StyledCell>
            <StyledCell>
              <StyledDate>{formatDate(item.dateAndTime)}</StyledDate>
            </StyledCell>
            <StyledCell>
              <StyledStatus selected={item.status}>{item.status}</StyledStatus>
            </StyledCell>
            <StyledCell>
              <StyledValue>{item.value}</StyledValue>
            </StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export default PayoutTable;
