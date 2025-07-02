import useCurrencyStore from "@/store/currencyStore";
import { SectionedData } from "@/types/CurrencyTypes";
import { useEffect } from "react";

export function useCurrenciesData() {
  const currencies = useCurrencyStore((state) => state.currencies);
  const favorites = useCurrencyStore((state) => state.favorites);
  const isConnected = useCurrencyStore((state) => state.isConnected);
  const favoriteCodes = new Set(favorites.map(fav => fav.code));
  const favoritesArray = currencies.filter(item => favoriteCodes.has(item.code));
  const nonFavoritesArray = currencies.filter(item => !favoriteCodes.has(item.code));
  const data: SectionedData[] = [
    ...(favoritesArray.length > 0
      ? [
          { type: "header" as const, title: "Favorites" },
          ...favoritesArray.map(item => ({ ...item, type: "item" as const })),
        ]
      : []),
    ...(nonFavoritesArray.length > 0
      ? favoritesArray.length > 0?[
        { type: "header" as const, title: "Other Currencies" },
        ...nonFavoritesArray.map(item => ({ ...item, type: "item" as const })),
      ]:[...nonFavoritesArray.map(item => ({ ...item, type: "item" as const }))]
      : []),
  ];

  const isLoading = useCurrencyStore((state) => state.isLoading);
  const error = useCurrencyStore((state) => state.error);

  const fetchCurrencies = useCurrencyStore((state) => state.fetchCurrencies);
  const fetchCurrencyInfo = useCurrencyStore((state) => state.fetchCurrencyInfo);
  const toggleFavorite = useCurrencyStore((state) => state.toggleFavorite);

  const refetch = () => {
    fetchCurrencyInfo();
    fetchCurrencies();
  };

  //hack to stop using api quata
  useEffect(() => {
    // if (data.length === 0) {
      if (isConnected) {
        fetchCurrencyInfo();
        fetchCurrencies();
      }
    // }
  }, [isConnected]);

  return { data, favoriteCodes, toggleFavorite, isLoading, error, refetch };
}