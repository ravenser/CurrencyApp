import { FILTER_BAR_HEIGHT } from "@/app/constants/config";
import useCurrencyStore from "@/store/currencyStore";
import React, { useEffect, useRef } from "react";
import Animated from "react-native-reanimated";
import { FilterBarContainer, FilterInput } from "./HeaderFilterBar.styled";
import { useAnimatedFilterBar } from "./useAnimatedFilterBar";

interface HeaderFilterBarProps {
  showFilter: boolean;
}

export const HeaderFilterBar: React.FC<HeaderFilterBarProps> = ({
  showFilter,
}) => {
  const filterValue = useCurrencyStore((state) => state.filterValue);
  const setFilterValue = useCurrencyStore((state) => state.setFilterValue);

  const prevShowFilter = useRef(showFilter);
  useEffect(() => {
    if (prevShowFilter.current && !showFilter && filterValue !== "") {
      setFilterValue("");
    }
    prevShowFilter.current = showFilter;
  }, [showFilter, setFilterValue, filterValue]);

  const animatedStyle = useAnimatedFilterBar(showFilter, FILTER_BAR_HEIGHT);

  return (
    <Animated.View
      style={[animatedStyle, { width: "100%" }]}
      pointerEvents={showFilter ? "auto" : "none"}
    >
      <FilterBarContainer style={{ height: FILTER_BAR_HEIGHT }}>
        <FilterInput
          value={filterValue}
          onChangeText={setFilterValue}
          placeholder="Type to search"
          testID="HeaderFilterInput"
        />
      </FilterBarContainer>
    </Animated.View>
  );
};
