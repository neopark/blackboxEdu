import React from "react";
import { TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback } from "react-native";

export interface MyOutsideTouchType extends TouchableOpacity {}

export interface T_MyOutsideTouchProps extends TouchableOpacityProps {}

const MyOutsideTouch = React.forwardRef<MyOutsideTouchType, T_MyOutsideTouchProps>((props, ref) => {
  return <TouchableWithoutFeedback {...props} ref={ref} />;
});

export default MyOutsideTouch;
