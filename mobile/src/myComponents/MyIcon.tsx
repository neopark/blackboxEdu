import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { IconProps } from "react-native-vector-icons/Icon";
import { GS } from "../styles/sizes";

export type T_MyIconName =
  | "plus"
  | "close"
  | "menu"
  | "right"
  | "left"
  | "home"
  | "creditcard"
  | "codesquareo"
  | "book"
  | "barschart"
  | "check"
  | "refresh-cw"
  | "picture";

export interface MyIconType extends AntDesign {}

export interface T_MyIconProps extends IconProps {
  name: T_MyIconName;
}

const MyIcon = React.forwardRef<MyIconType, T_MyIconProps>((props, ref) => {
  const { name } = props;
  const newProps = {
    size: GS(40),
    color: "#666666",
    ...props,
  };

  switch (name) {
    case "plus":
    case "close":
    case "left":
    case "right":
    case "home":
    case "creditcard":
    case "codesquareo":
    case "book":
    case "barschart":
    case "picture":
    case "check": {
      return <AntDesign {...newProps} ref={ref} />;
    }
    case "menu":
    case "refresh-cw": {
      return <Feather {...newProps} ref={ref} />;
    }
  }
});

export default MyIcon;
