import ErrorToast from "@/app/components/ErrorToast";
import Header from "@/app/components/Header";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import RateBullet from "@/app/components/RateBullet";
import useCurrencyStore from "@/store/currencyStore";
import { SectionedData } from "@/types/CurrencyTypes";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { HomePageContainer, SectionHeader } from "./HomePage.styled";
import { useCurrenciesData } from "./useCurrenciesData";

export default function HomePage() {
  const { data, favoriteCodes, toggleFavorite, isLoading, error, refetch } =
    useCurrenciesData();
  const { isConnected, lastUpdated } = useCurrencyStore();
  const [showError, setShowError] = useState(true);

  const keyExtractor = useCallback((item: SectionedData) => {
    return item.type === "header" ? item.title : item.code;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SectionedData; index: number }) => {
      const prev = data[index - 1];
      const next = data[index + 1];
      const isFirst = !prev || prev.type === "header";
      const isLast = !next || next.type === "header";
      return item.type === "header" ? (
        <SectionHeader testID="SectionHeader">{item.title}</SectionHeader>
      ) : (
        <RateBullet
          rate={item.rate}
          name={item.name}
          code={item.code}
          isFirst={isFirst}
          isLast={isLast}
          isFavorite={favoriteCodes.has(item.code)}
          onFavoritePress={() => toggleFavorite(item)}
        />
      );
    },
    [data, favoriteCodes, toggleFavorite]
  );
  const showToast = !!error && showError;

  return (
    <>
      <Header isConnected={isConnected} lastUpdated={lastUpdated} />
      <ErrorToast
        visible={showToast}
        message={error || ""}
        onRetry={() => {
          setShowError(false);
          refetch();
          setTimeout(() => setShowError(true), 1000);
        }}
        onClose={() => setShowError(false)}
      />
      <HomePageContainer>
        <FlashList
          testID="FlashList"
          data={data}
          extraData={favoriteCodes}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
        />
        {isLoading && <LoadingIndicator />}
      </HomePageContainer>
    </>
  );
}
