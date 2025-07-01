import { View } from "react-native";
import HomePage from "./screens/HomePage/HomePage";

export default function Index() {
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
