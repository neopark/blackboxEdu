import React from "react";
import MyText from "../myComponents/MyText";
import MyIcon from "../myComponents/MyIcon";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import values from "../values";
import { GS } from "../styles/sizes";

export type T_MyCheckBoxProps = {
  children: string;
  value: boolean;
  setValue: (value: boolean) => void;
};

function MyCheckBox({ children, value, setValue }: T_MyCheckBoxProps) {
  return (
    <MyTouch
      onPress={() => {
        setValue(!value);
      }}
      style={{
        alignSelf: "flex-start",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <MyView
        style={{
          width: GS(24),
          height: GS(24),
          alignItems: "center",
          borderColor: !value ? "#888888" : undefined,
          borderWidth: !value ? GS(2) : undefined,
          borderRadius: GS(3),
          justifyContent: "center",
          backgroundColor: value ? values.colors.blue : undefined,
        }}
      >
        {value && <MyIcon name="check" size={GS(20)} color="#ffffff" />}
      </MyView>
      <MyText
        style={{
          marginLeft: GS(5),
        }}
      >
        {children}
      </MyText>
    </MyTouch>
  );
}

export default MyCheckBox;
