import React from "react";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_MyButtonProps = {
  onPress: () => void;
  children: string;
};

function MyButton({ onPress, children }: T_MyButtonProps) {
  return (
    <MyTouch
      onPress={onPress}
      style={{
        padding: GS(15),
        alignSelf: "flex-start",
        borderRadius: GS(5),
        backgroundColor: "#eeeeee",
        margin: GS(5),
      }}
    >
      <MyText
        font="nsm"
        style={{
          color: values.colors.blue,
        }}
      >
        {children}
      </MyText>
    </MyTouch>
  );
}

export default MyButton;
