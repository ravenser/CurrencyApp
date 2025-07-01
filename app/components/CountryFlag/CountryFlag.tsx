import {
  COUNTRY_FALLBACK,
  CurrencyToCountry,
} from "@/app/constants/currencyToCountry";
import React from "react";
import CountryFlag from "react-native-country-flag";
import { CountryFlagContainer } from "./CountryFlag.styled";
type CountryFlagProps = {
  isoCode: string;
  size: number;
};

export default function CustomCountryFlag({ isoCode, size }: CountryFlagProps) {
  return (
    <CountryFlagContainer size={size + size / 5}>
      <CountryFlag
        isoCode={CurrencyToCountry[isoCode] ?? COUNTRY_FALLBACK}
        size={size}
      />
    </CountryFlagContainer>
  );
}
