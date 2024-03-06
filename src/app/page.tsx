import StyledContainer from "@/components/Container/Container.styled";
import StyledHeader from "@/components/Header/Header.styled";
import PayoutList from "@/components/PayoutList";

export default function Home() {
  return (
    <StyledContainer>
      <StyledHeader>Payouts</StyledHeader>
      <PayoutList />
    </StyledContainer>
  );
}
