import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const width = window.width;

function getSize(size: number) {
  return (width * size) / 1080;
}

export const GS = getSize;
