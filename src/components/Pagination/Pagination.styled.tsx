import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PaginationButtonProps {
  selected?: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  padding: 8px 10px;
  color: ${(props) => (props?.selected ? "#333" : "#999")};
  margin: 0;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: 600;
  border-radius: 5px;
  margin: 0 5px;
  :focus {
    outline: none;
  }
`;

export const NavigationButton = styled.button<{
  disabled: boolean;
}>`
  font-size: 15px;
  border: none;
  color: ${(props) => (props.disabled ? "#999" : "#333")};
  padding: 8px 10px;
  border-radius: 5px;
  :hover {
    background-color: #f0f0f0;
  }
  margin: 0;
`;
