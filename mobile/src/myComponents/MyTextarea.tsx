import React from "react";
import { TextStyle } from "react-native";
import { GS } from "../styles/sizes";
import MyInput, { MyInputType, T_MyInputProps } from "./MyInput";

export interface MyTextareaType extends MyInputType {}

export interface T_MyTextareaProps extends T_MyInputProps {}

const MyTextarea = React.forwardRef<MyTextareaType, T_MyTextareaProps>((props, ref) => {
  return (
    <MyInput
      {...props}
      ref={ref}
      multiline={props.multiline || true}
      style={{
        height: GS(400),
        borderBottomWidth: GS(0),
        borderRadius: GS(30),
        textAlignVertical: "top",
        ...(props.style as TextStyle),
      }}
    />
  );
});

export default MyTextarea;
