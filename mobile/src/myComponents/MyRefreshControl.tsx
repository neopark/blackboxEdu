import React from "react";
import { RefreshControl, RefreshControlProps } from "react-native";
import values from "../values";

export interface MyRefreshControlType extends RefreshControl {}

export interface T_MyRefreshControlProps extends RefreshControlProps {}

const MyRefreshControl = React.forwardRef<MyRefreshControlType, T_MyRefreshControlProps>(
  (props, ref) => {
    return (
      <RefreshControl
        {...props}
        ref={ref}
        colors={[values.colors.blue]}
        tintColor={values.colors.blue}
        progressBackgroundColor="#ffffff"
      />
    );
  }
);

export default MyRefreshControl;
