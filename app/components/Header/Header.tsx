import useCurrencyStore from "@/store/currencyStore";
import React, { useState } from "react";
import CustomCountryFlag from "../CountryFlag";
import { HeaderFilterBar } from "../Filterbar/HeaderFilterBar";
import SvgIcon from "../SvgIcon";
import {
  BaseCurrencyContainer,
  FilterIconButton,
  HeaderContainer,
  HeaderText,
  OfflineContainer,
  OfflineText,
  OfflineTextContainer,
  StyledSafeAreaView,
} from "./Header.styled";

export default function Header() {
  const [showFilter, setShowFilter] = useState(false);

  const isConnected = useCurrencyStore((state) => state.isConnected);
  const lastUpdated = useCurrencyStore((state) => state.lastUpdated);

  return (
    <StyledSafeAreaView>
      <HeaderContainer testID="Header">
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
          <FilterIconButton
            onPress={() => setShowFilter((prev) => !prev)}
            testID="HeaderFilterIcon"
          >
            <SvgIcon name="Search" width={28} height={28} color="white" />
          </FilterIconButton>
          <HeaderText>EUR</HeaderText>
          <CustomCountryFlag isoCode="EUR" size={24} />
        </BaseCurrencyContainer>
      </HeaderContainer>
      <HeaderFilterBar showFilter={showFilter} />
    </StyledSafeAreaView>
  );
}
