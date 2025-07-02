import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function useAnimatedFilterBar(show: boolean, height: number) {
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming(show ? height : 0, { duration: 200 });
    animatedOpacity.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [show, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
    overflow: "hidden",
  }));

  return animatedStyle;
} 