import { PayoutWrapper } from "@/components/PayoutWrapper";
import StyledContainer from "@/components/common/Container.styled";
import StyledHeader from "@/components/common/Header.styled";

export default function Home() {
  return (
    <StyledContainer>
      <StyledHeader>Payouts</StyledHeader>
      <PayoutWrapper />
    </StyledContainer>
  );
}
