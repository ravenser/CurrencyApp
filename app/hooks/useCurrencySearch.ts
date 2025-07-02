import useCurrencyStore from "@/store/currencyStore";
import { SectionedData } from "@/types/CurrencyTypes";
import { useDebounce } from "@/utils/useDebounce";
import { useMemo } from "react";
import { useCurrenciesData } from "./useCurrenciesData";

export function useCurrencySearch() {
  const { data } = useCurrenciesData();
  const filterValue = useCurrencyStore((state) => state.filterValue);
  const debouncedFilterValue = useDebounce(filterValue, 200);

  const isSearching = !!debouncedFilterValue.trim();
  const filteredData = useMemo(() => data.filter((item: SectionedData) => {
    if (isSearching) {
      if (item.type !== "item") return false;
      const search = debouncedFilterValue.trim().toLowerCase();
      return (
        item.code.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search)
      );
    } else {
      return true;
    }
  }), [data, debouncedFilterValue, isSearching]);

  return {
    filteredData,
    isSearching,
  };
}