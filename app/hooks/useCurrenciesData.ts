import useCurrencyStore from "@/store/currencyStore";
import getSectionedData from "@/utils/getSectionedData";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useCurrenciesData() {
  const { currencies, favorites, isConnected, isLoading, error, fetchCurrencies, fetchCurrencyInfo, toggleFavorite } =
  useCurrencyStore(
    useShallow(state => ({
      currencies: state.currencies,
      favorites: state.favorites,
      isConnected: state.isConnected,
      isLoading: state.isLoading,
      error: state.error,
      fetchCurrencies: state.fetchCurrencies,
      fetchCurrencyInfo: state.fetchCurrencyInfo,
      toggleFavorite: state.toggleFavorite,
    }))
  );
  const {data, favoriteCodes}= getSectionedData(currencies, favorites);

  const refetch = () => {
    fetchCurrencyInfo();
    fetchCurrencies();
  };

  //hack to stop using api quata
  useEffect(() => {
    if (data.length === 0) {
      if (isConnected) {
        fetchCurrencyInfo();
        fetchCurrencies();
      }
    }
  }, [isConnected]);

  return { data, favoriteCodes, toggleFavorite, isLoading, error, refetch };
}