"use client";

import styled from "styled-components";

export const StyledDate = styled.div`
  color: rgb(111, 118, 126);
  font-weight: 600;
  font-size: 14px;
`;

interface StatusProps {
  selected: "Completed" | "Pending";
}

export const StyledStatus = styled.div<StatusProps>`
  background-color: ${(props) =>
    props.selected === "Completed" ? "rgb(96, 202, 87)" : "rgb(193, 196, 199)"};
  width: ${(props) => (props.selected === "Completed" ? "95px" : "75px")};
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  color: rgb(39, 43, 48);
  padding: 5px;
  font-weight: 600;
  font-size: 14px;
`;

export const StyledValue = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const StyledHeader = styled.div`
  color: rgb(111, 118, 126);
  display: flex;
  font-size: 12px;
`;

export const StyledBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #ffffff;
  }
`;

export const StyledCell = styled.td`
  padding: 10px;
`;

export const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;

export const StyledTh = styled.th`
  padding: 10px;
`;

export const StyledRow = styled.tr`
  height: 48px;
  width: 100%;
`;

export const SkeletonLoader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 404px;
  background-color: #f9f9f9;

  @keyframes loading {
    0% {
      background-color: #f9f9f9;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #f9f9f9;
    }
  }

  animation: loading 1s infinite;
`;

export const StyledThead = styled.thead`
  width: 100%;
`;
