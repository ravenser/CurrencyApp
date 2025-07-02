import { View } from "react-native";
import { useConnectionStatus } from "./hooks/useConnectionStatus";
import HomePage from "./screens/HomePage/HomePage";

export default function Index() {
  useConnectionStatus();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HomePage />
    </View>
  );
}
