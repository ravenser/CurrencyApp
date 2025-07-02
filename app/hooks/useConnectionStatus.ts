import useCurrencyStore from "@/store/currencyStore";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export const useConnectionStatus = () => {
  const { setConnectionStatus } = useCurrencyStore();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(!!state.isConnected);
    });
    return () => unsubscribe();
  }, [setConnectionStatus]);
};