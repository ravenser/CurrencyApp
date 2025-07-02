import { fetchCurrencies, fetchCurrenciesInfo } from "@/api/currencyApi";
import { mapCurrenciesWithInfo } from "@/utils/dataMapping";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Currency, CurrencyInfo } from "../types/CurrencyTypes";

type CurrencyStore = {
    currencyInfo: CurrencyInfo[];
    currencies: Currency[];
    favorites: Currency[];
    isLoading: boolean;
    isConnected: boolean;
    lastUpdated: number | null;
    error: string | null;
    filterValue: string;
    fetchCurrencies: () => Promise<void>;
    fetchCurrencyInfo: () => Promise<void>;
    toggleFavorite: (currency: Currency) => void;
    setConnectionStatus: (status: boolean) => void;
    setFilterValue: (v: string) => void;
};

const useCurrencyStore = create<CurrencyStore>()(
    persist<CurrencyStore>(
      (set, get) => ({
        currencyInfo: [],
        currencies: [],
        isConnected: true,
        favorites: [],
        isLoading: false,
        lastUpdated: null,
        error: null,
        filterValue: "",
        setFilterValue: (v: string) => set({ filterValue: v }),
        setConnectionStatus: (status: boolean) => set({ isConnected: status }),

        toggleFavorite: (currency) => {
          const { favorites } = get();
          const exists = favorites.find(fav => fav.code === currency.code);
          const newFavorites = exists
            ? favorites.filter(fav => fav.code !== currency.code)
            : [...favorites, currency];
          set({ favorites: newFavorites });
        },

        fetchCurrencyInfo: async () => {
          set({ isLoading: true, error: null });
          const net = await NetInfo.fetch();
          set({ isConnected: net.isConnected ?? false });
          if (!net.isConnected) {
            set({ isLoading: false});
            return;
          }
          try {
            const currencyInfoData = await fetchCurrenciesInfo();
            set({ currencyInfo: currencyInfoData, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch currencies info", isLoading: false });
          }
        },       
           
        fetchCurrencies: async () => {
          set({ isLoading: true, error: null });
          const net = await NetInfo.fetch();
          set({ isConnected: net.isConnected ?? false });
          if (!net.isConnected) {
            set({ isLoading: false});
            return;
          }
          try {
            const currenciesData = await fetchCurrencies();
            const mappedData = mapCurrenciesWithInfo(currenciesData, get().currencyInfo);
            set({ currencies: mappedData, isLoading: false, lastUpdated: Date.now() });
          } catch (error) {
            set({ error: "Failed to fetch currencies rates", isLoading: false });
          }
        }
      }),
      {
        name: "currency-store",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          ...state,
          filterValue: "",
          isConnected: true,
          isLoading: false,
          lastUpdated: null,
        }),
      }
    )
  );

  export default useCurrencyStore;