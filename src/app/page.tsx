import StyledContainer from "@/components/Container/Container.styled";
import StyledHeader from "@/components/Header/Header.styled";
import PayoutList from "@/components/PayoutWrapper";

export default function Home() {
  return (
    <StyledContainer>
      <StyledHeader>Payouts</StyledHeader>
      <PayoutList />
    </StyledContainer>
  );
}
