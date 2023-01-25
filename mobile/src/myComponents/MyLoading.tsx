import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import values from "../values";

export interface MyLoadingType extends ActivityIndicator {}

export interface T_MyLoadingProps extends ActivityIndicatorProps {}

const MyLoading = React.forwardRef<MyLoadingType, T_MyLoadingProps>((props, ref) => {
  return (
    <ActivityIndicator
      {...props}
      ref={ref}
      size={props.size || "large"}
      color={props.color || values.colors.blue}
    />
  );
});

export default MyLoading;
