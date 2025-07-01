import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchCurrencies, fetchCurrenciesInfo } from "../api/currencyApi";
import { Currency, CurrencyInfo } from "../types/CurrencyTypes";
import { mapCurrenciesWithInfo } from "../utils/dataMapping";

type CurrencyStore = {
    currencyInfo: CurrencyInfo[];
    currencies: Currency[];
    favorites: Currency[];
    isLoading: boolean;
    lastUpdated: number | null;
    error: string | null;
    fetchCurrencies: () => Promise<void>;
    toggleFavorite: (currency: Currency) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
      (set, get) => ({
        currencyInfo: [],
        currencies: [],
        favorites: [],
        isLoading: false,
        lastUpdated: null,
        error: null,

        fetchCurrencyInfo: async () => {
          set({ isLoading: true, error: null });
          const net = await NetInfo.fetch();
          if (!net.isConnected) {
            set({ isLoading: false, error: "Offline mode: showing cached data" });
            return;
          }
          try {
            const currencyInfoData = await fetchCurrenciesInfo();
            set({ currencyInfo: currencyInfoData, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch currencies", isLoading: false });
          }
        },          
        fetchCurrencies: async () => {
          set({ isLoading: true, error: null });
          const net = await NetInfo.fetch();
          if (!net.isConnected) {
            set({ isLoading: false, error: "Offline mode: showing cached data" });
            return;
          }
          try {
            const currenciesData = await fetchCurrencies();
            const mappedData = mapCurrenciesWithInfo(currenciesData, get().currencyInfo);
            set({ currencies: mappedData, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch currencies", isLoading: false });
          }
        },
        toggleFavorite: (currency) => {
          const { favorites } = get();
          const exists = favorites.find(fav => fav.code === currency.code);
          const newFavorites = exists
            ? favorites.filter(fav => fav.code !== currency.code)
            : [...favorites, currency];
          set({ favorites: newFavorites });
        },
      }),
      {
        name: "currency-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );