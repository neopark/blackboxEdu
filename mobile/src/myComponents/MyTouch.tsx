import React from "react";
import { TouchableOpacity, ViewStyle, TouchableOpacityProps } from "react-native";

export interface MyTouchType extends TouchableOpacity {}

export interface T_MyTouchProps extends TouchableOpacityProps {}

const MyTouch = React.forwardRef<MyTouchType, T_MyTouchProps>((props, ref) => {
  return (
    <TouchableOpacity
      {...props}
      ref={ref}
      activeOpacity={props.activeOpacity || 0.5}
      style={{
        borderColor: "#eeeeee",
        ...(props.style as ViewStyle),
      }}
    />
  );
});

export default MyTouch;
