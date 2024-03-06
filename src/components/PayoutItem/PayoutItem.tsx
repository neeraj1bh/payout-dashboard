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
} from "./PayoutItem.styled";
import { FC } from "react";

interface PayoutData {
  dateAndTime: string;
  status: "Pending" | "Completed";
  value: string;
  username: string;
}

interface Props {
  data: PayoutData[];
}

const PayoutTable: FC<Props> = ({ data }) => {
  return (
    <StyledTable>
      <StyledThead>
        <StyledRow>
          <StyledTh>
            <StyledHeader>Username</StyledHeader>
          </StyledTh>
          <StyledTh>
            <StyledHeader>Date & Time</StyledHeader>
          </StyledTh>
          <StyledTh>
            <StyledHeader>Status</StyledHeader>
          </StyledTh>
          <StyledTh>
            <StyledHeader>Value</StyledHeader>
          </StyledTh>
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
