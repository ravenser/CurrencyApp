import { StatusBar } from "expo-status-bar";
import React from "react";
import CustomCountryFlag from "../CountryFlag";
import SvgIcon from "../SvgIcon";
import {
  BaseCurrencyContainer,
  HeaderContainer,
  HeaderText,
  OfflineContainer,
  OfflineText,
  OfflineTextContainer,
  StyledSafeAreaView,
} from "./Header.styled";

type HeaderProps = {
  isConnected: boolean;
  lastUpdated: number | null;
};

export default function Header({ isConnected, lastUpdated }: HeaderProps) {
  return (
    <StyledSafeAreaView>
      <StatusBar style="dark" backgroundColor="rgb(173, 171, 171)" />
      <HeaderContainer>
        {isConnected ? (
          <HeaderText>CurrencyWise</HeaderText>
        ) : (
          <OfflineContainer>
            <OfflineTextContainer>
              <OfflineText>CurrencyWise</OfflineText>
              <OfflineText>{`Last updated: ${
                lastUpdated ? new Date(lastUpdated).toLocaleString() : "Never"
              }`}</OfflineText>
            </OfflineTextContainer>
            <SvgIcon name="Offline" width={36} height={36} color="white" />
          </OfflineContainer>
        )}
        <BaseCurrencyContainer>
          <HeaderText>EUR</HeaderText>
          <CustomCountryFlag isoCode="EUR" size={24} />
        </BaseCurrencyContainer>
      </HeaderContainer>
    </StyledSafeAreaView>
  );
}
