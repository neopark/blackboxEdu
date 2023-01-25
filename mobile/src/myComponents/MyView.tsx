import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";

export interface MyViewType extends View {}

export interface T_MyViewProps extends ViewProps {}

const MyView = React.forwardRef<MyViewType, T_MyViewProps>((props, ref) => {
  return (
    <View
      {...props}
      ref={ref}
      style={{
        borderColor: "#eeeeee",
        ...(props.style as ViewStyle),
      }}
    />
  );
});

export default MyView;
