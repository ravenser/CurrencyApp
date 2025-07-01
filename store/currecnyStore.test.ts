import NetInfo from '@react-native-community/netinfo';
import { mapCurrenciesWithInfo } from '../utils/dataMapping';
import useCurrencyStore from './currencyStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

// Mock API functions
jest.mock('../api/currencyApi', () => ({
  fetchCurrencies: jest.fn(() => Promise.resolve([])),
  fetchCurrenciesInfo: jest.fn(() => Promise.resolve([])),
}));

describe('Currency store ', () => {
  beforeEach(() => {
    const { setState } = useCurrencyStore;
    setState({
      currencyInfo: [],
      currencies: [],
      favorites: [],
      isLoading: false,
      lastUpdated: null,
      error: null,
    });
  });

  it('should initialize with empty favorites', () => {
    expect(useCurrencyStore.getState().favorites).toEqual([]);
  });

  it('should add a currency to favorites', () => {
    const currency = { code: 'USD', name: 'US Dollar', rate: 1, timestamp: 123};
    useCurrencyStore.getState().toggleFavorite(currency);
    expect(useCurrencyStore.getState().favorites).toEqual([currency]);
  });

  it('should remove a currency from favorites if already present', () => {
    const currency = { code: 'USD', name: 'US Dollar', rate: 1, timestamp: 123};
    useCurrencyStore.getState().toggleFavorite(currency);
    useCurrencyStore.getState().toggleFavorite(currency);
    expect(useCurrencyStore.getState().favorites).toEqual([]);
  });

  it('should maintain favorites across state updates', () => {
    const currency = { code: 'USD', name: 'US Dollar', rate: 1, timestamp: 123};
    
    useCurrencyStore.getState().toggleFavorite(currency);

    useCurrencyStore.setState({ isLoading: true });
    
    expect(useCurrencyStore.getState().favorites).toContain(currency);
  });


  it('should clear error when starting new fetch', async () => {
    useCurrencyStore.setState({ error: 'Previous error' });
    
    const { fetchCurrencies } = useCurrencyStore.getState();
    await fetchCurrencies();
    
    expect(useCurrencyStore.getState().error).toBeNull();
  });

  it('should set offline error when network is disconnected', async () => {

    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: false });

    const { fetchCurrencies } = useCurrencyStore.getState();
    await fetchCurrencies();
    
    expect(useCurrencyStore.getState().error).toBe('Offline mode: showing cached data');
    expect(useCurrencyStore.getState().isLoading).toBe(false);
  });

  it('should map and merge currency data with currencyInfo by code (utility function)', () => {
    const mockCurrencies = [
      { code: 'USD', rate: 1 },
      { code: 'EUR', rate: 0.9 },
    ];
    const mockCurrencyInfo = [
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
    ];
    const result = mapCurrenciesWithInfo(mockCurrencies, mockCurrencyInfo);
    expect(result).toEqual([
      { rate: 1,  code: 'USD', name: 'US Dollar' },
      { rate: 0.9,  code: 'EUR', name: 'Euro' },
    ]);
  });

  it('should only include intersection of rates and infos (matched by code)', () => {
    const rates = [
      { code: 'USD', rate: 1 },
      { code: 'EUR', rate: 0.9 },
      { code: 'JPY', rate: 150 }, 
    ];
    const infos = [
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
      { code: 'GBP', name: 'Pound Sterling' }, 
    ];
    const result = mapCurrenciesWithInfo(rates, infos);
    expect(result).toEqual([
      { rate: 1, code: 'USD', name: 'US Dollar' },
      { rate: 0.9, code: 'EUR', name: 'Euro' },
    ]);
  });
});