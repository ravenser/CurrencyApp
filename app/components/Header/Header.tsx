import React from "react";
import CustomCountryFlag from "../CountryFlag";
import {
  BaseCurrencyContainer,
  HeaderContainer,
  HeaderText,
} from "./Header.styled";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderText>CurrencyWise</HeaderText>
      <BaseCurrencyContainer>
        <HeaderText>EUR</HeaderText>
        <CustomCountryFlag isoCode="EUR" size={24} />
      </BaseCurrencyContainer>
    </HeaderContainer>
  );
}
