import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImage from '../../assets/dt-money-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}