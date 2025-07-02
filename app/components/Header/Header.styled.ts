
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  padding: 0 16px 16px 16px;
  background-color: rgb(173, 171, 171);
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: rgb(255, 255, 255);
`;

export const OfflineContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const OfflineTextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const OfflineText = styled.Text`
  font-size: 12px;
  color: rgb(255, 255, 255);
`;

export const BaseCurrencyContainer = styled.View`
  gap: 8px;
  align-items: center;
  flex-direction: row;
`;

export const StyledSafeAreaView = styled(SafeAreaView)`
  background-color: rgb(173, 171, 171);
`;