import { Currency, SectionedData } from "@/types/CurrencyTypes";

export default function getSectionedData(currencies: Currency[], favorites: Currency[]) {
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
        ? favoritesArray.length > 0
          ? [
              { type: "header" as const, title: "Other Currencies" },
              ...nonFavoritesArray.map(item => ({ ...item, type: "item" as const })),
            ]
          : [...nonFavoritesArray.map(item => ({ ...item, type: "item" as const }))]
        : []),
    ];
    return { data, favoriteCodes };
  }