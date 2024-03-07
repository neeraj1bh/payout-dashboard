import { formatDate } from "@/utils/formatDate";
import {
  FallBack,
  StyledBody,
  StyledCell,
  StyledDate,
  StyledRow,
  StyledStatus,
  StyledTable,
  StyledTableContainer,
  StyledThead,
  StyledValue,
} from "./PayoutTable.styled";
import { FC, useMemo, useState } from "react";
import { TableHeader } from "./TableHeader";
import { SortOrder } from "./types";
import { Loader } from "../common/Loader.styled";

interface PayoutData {
  dateAndTime: string;
  status: "Pending" | "Completed";
  value: string;
  username: string;
}

interface PayoutTableProps {
  data: PayoutData[];
  loading: boolean;
  error: string;
}

const PayoutTable: FC<PayoutTableProps> = ({ data, loading, error }) => {
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

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
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
  }, [data, sortBy, sortOrder]);

  const showTable = !loading && !error && data.length > 0;

  if (!showTable) {
    return (
      <FallBack>
        {loading && <Loader />}
        {error && error}
        {data.length === 0 && !loading && !error && "No data found"}
      </FallBack>
    );
  }
  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledThead>
          <StyledRow>
            <TableHeader
              onClick={() => {
                handleSort("username");
              }}
              heading="Username"
              sortOrder={sortOrder}
            />
            <TableHeader
              onClick={() => {
                handleSort("dateAndTime");
              }}
              heading="Date"
              sortOrder={sortOrder}
            />
            <TableHeader
              onClick={() => {
                handleSort("status");
              }}
              heading="Status"
              sortOrder={sortOrder}
            />
            <TableHeader
              onClick={() => {
                handleSort("value");
              }}
              heading="Value"
              sortOrder={sortOrder}
            />
          </StyledRow>
        </StyledThead>
        <StyledBody>
          {sortedData.map((item, index) => (
            <StyledRow key={index}>
              <StyledCell>
                <StyledDate>{item?.username || "No Username"}</StyledDate>
              </StyledCell>
              <StyledCell>
                <StyledDate>{formatDate(item.dateAndTime)}</StyledDate>
              </StyledCell>
              <StyledCell>
                <StyledStatus $status={item.status}>{item.status}</StyledStatus>
              </StyledCell>
              <StyledCell>
                <StyledValue>{item.value}</StyledValue>
              </StyledCell>
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default PayoutTable;
