import React from "react";
import { StatusBar, StatusBarProps } from "react-native";
import values from "../values";
import MyView from "./MyView";

export interface MyStatusBarType extends StatusBar {}

export interface T_MyStatusBarProps extends StatusBarProps {}

const MyStatusBar = React.forwardRef<MyStatusBarType, T_MyStatusBarProps>((props, ref) => {
  return (
    <>
      <StatusBar
        {...props}
        ref={ref}
        translucent={props.translucent || true}
        barStyle={props.barStyle || "dark-content"}
        backgroundColor="#00000000"
      />
      <MyView
        style={{
          height: values.device.statusBarHeight,
          backgroundColor: props.backgroundColor || "#ffffff",
        }}
      />
    </>
  );
});

export default MyStatusBar;
