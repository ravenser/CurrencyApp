import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import HomePage from "./HomePage";

jest.mock("@/app/components/SvgIcon", () => () => null);
jest.mock("@shopify/flash-list", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    FlashList: ({
      data,
      renderItem,
      testID,
    }: {
      data: any[];
      renderItem: (args: { item: any; index: number }) => React.ReactNode;
      testID?: string;
    }) => (
      <View>
        {testID ? <View testID={testID} /> : null}
        {data.map((item: any, index: number) => (
          <View key={index}>{renderItem({ item, index })}</View>
        ))}
      </View>
    ),
  };
});

const mockUseCurrencySearch = jest.fn();
jest.mock("../../hooks/useCurrencySearch", () => ({
  useCurrencySearch: () => mockUseCurrencySearch(),
}));

const mockUseCurrenciesData = jest.fn();
jest.mock("../../hooks/useCurrenciesData", () => ({
  useCurrenciesData: () => mockUseCurrenciesData(),
}));

const mockUseCurrencyStore = jest.fn();
jest.mock("@/store/currencyStore", () => () => mockUseCurrencyStore());

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Header and FlashList", () => {
    mockUseCurrenciesData.mockReturnValue({
      data: [],
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: [],
    });
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("Header")).toBeTruthy();
    expect(getByTestId("FlashList")).toBeTruthy();
  });

  it("shows LoadingIndicator when isLoading is true", () => {
    mockUseCurrenciesData.mockReturnValue({
      data: [],
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("shows ErrorToast when error exists", () => {
    mockUseCurrenciesData.mockReturnValue({
      data: [],
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: false,
      error: "Something went wrong",
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: [],
    });
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("ErrorToast")).toBeTruthy();
  });

  it("renders RateBullet for each item", () => {
    const data = [
      { type: "header", title: "Popular" },
      { type: "item", code: "USD", name: "US Dollar", rate: 1.1 },
      { type: "item", code: "EUR", name: "Euro", rate: 1.2 },
    ];
    const toggleFavorite = jest.fn();
    mockUseCurrenciesData.mockReturnValue({
      data,
      favoriteCodes: new Set(["USD"]),
      toggleFavorite,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: data,
    });
    const { getByText } = render(<HomePage />);
    expect(getByText("USD : US Dollar")).toBeTruthy();
    expect(getByText("EUR : Euro")).toBeTruthy();
  });

  it("renders SectionHeader for header items", () => {
    const data = [
      { type: "header", title: "Popular" },
      { type: "item", code: "USD", name: "US Dollar", rate: 1.1 },
    ];
    mockUseCurrenciesData.mockReturnValue({
      data,
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: data,
    });
    const { getAllByTestId } = render(<HomePage />);
    const headers = getAllByTestId("SectionHeader");
    expect(headers[0].props.children).toBe("Popular");
  });

  it("calls refetch and hides ErrorToast on retry", () => {
    jest.useFakeTimers();
    const refetch = jest.fn();
    mockUseCurrenciesData.mockReturnValue({
      data: [],
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: false,
      error: "Something went wrong",
      refetch,
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: [],
    });
    const { getByTestId } = render(<HomePage />);
    fireEvent.press(getByTestId("RetryButton"));

    expect(refetch).toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    jest.useRealTimers();
  });

  it("hides ErrorToast on close", () => {
    mockUseCurrenciesData.mockReturnValue({
      data: [],
      favoriteCodes: new Set(),
      toggleFavorite: jest.fn(),
      isLoading: false,
      error: "Something went wrong",
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: [],
    });
    const { getByTestId } = render(<HomePage />);
    fireEvent.press(getByTestId("CloseButton"));
  });

  it("handles favorite/unfavorite logic when favorite button is pressed", () => {
    const data = [
      { type: "header", title: "Popular" },
      { type: "item", code: "USD", name: "US Dollar", rate: 1.1 },
      { type: "item", code: "EUR", name: "Euro", rate: 1.2 },
    ];
    const toggleFavorite = jest.fn();
    mockUseCurrenciesData.mockReturnValue({
      data,
      favoriteCodes: new Set(["USD"]),
      toggleFavorite,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseCurrencyStore.mockReturnValue({
      isConnected: true,
      lastUpdated: 1234567890,
    });
    mockUseCurrencySearch.mockReturnValue({
      filteredData: data,
    });
    const { getByTestId } = render(<HomePage />);

    const usdFavoriteButton = getByTestId("FavoriteButton-USD");
    const eurFavoriteButton = getByTestId("FavoriteButton-EUR");

    fireEvent.press(usdFavoriteButton);
    expect(toggleFavorite).toHaveBeenCalledWith(data[1]);

    fireEvent.press(eurFavoriteButton);
    expect(toggleFavorite).toHaveBeenCalledWith(data[2]);
  });
});
