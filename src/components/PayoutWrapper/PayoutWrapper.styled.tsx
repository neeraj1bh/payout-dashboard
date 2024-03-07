"use client";

import styled from "styled-components";

export const StyledPayoutHeader = styled.div`
  color: rgb(39, 43, 48);
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
`;

export const StyledPayout = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledSearch = styled.div`
  border-radius: 4px;
  height: 100%;
  width: 250px;
  height: 40px;
  background-color: rgb(205, 205, 205);
`;

export const StyledSpacer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StyledChip = styled.div`
  border-radius: 4px;
  height: 100%;
  width: 16px;
  height: 32px;
  background-color: rgb(153, 157, 255);
`;

export const StyledWrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FallBackWrapperProps {
  $showFallback: boolean;
}

export const FallBackWrapper = styled.div<FallBackWrapperProps>`
  display: ${({ $showFallback }) => ($showFallback ? "flex" : "none")};
  height: 514px;
  justify-content: center;
  align-items: center;
`;
