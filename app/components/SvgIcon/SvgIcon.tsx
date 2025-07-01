import { IconName, icons } from "@/assets/icons/icons";
import React from "react";

type SvgIconProps = {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
};

const SvgIcon = ({ name, width, height, color }: SvgIconProps) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return <SvgIcon width={width} height={height} color={color} />;
};

export default SvgIcon;
