import { ActivityIndicator } from "react-native";
import { BottomContainer } from "./LoadingIndicator.styled";

export default function LoadingIndicator() {
  return (
    <BottomContainer>
      <ActivityIndicator size="small" color="#fff" />
    </BottomContainer>
  );
}
