import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Currency = {
    code: string;
    name: string;
    rate: number;
    timestamp: number;
}

type CurrencyStore = {
    currencies: Currency[];
    favorites: Currency[];
    isLoading: boolean;
    error: string | null;
    fetchCurrencies: () => Promise<void>;
    toggleFavorite: (currency: Currency) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
      (set, get) => ({
        currencies: [],
        favorites: [],
        isLoading: false,
        error: null,
        fetchCurrencies: async () => {
          set({ isLoading: true, error: null });
          // ...fetch logic
        },
        toggleFavorite: (currency) => {
          // ...toggle logic
        },
      }),
      {
        name: "currency-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );