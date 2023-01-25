import React from "react";
import { GS } from "../styles/sizes";
import values from "../values";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";

export type T_MyRadioProps = {
  children: string;
  value: boolean;
  setValue: (value: boolean) => void;
};

function MyRadio({ children, value, setValue }: T_MyRadioProps) {
  return (
    <MyTouch
      disabled={value}
      onPress={() => {
        setValue(!value);
      }}
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MyView
        style={{
          borderRadius: GS(12),
          borderWidth: GS(2),
          width: GS(24),
          height: GS(24),
          justifyContent: "center",
          alignItems: "center",
          borderColor: !value ? "#888888" : values.colors.blue,
        }}
      >
        {value && (
          <MyView
            style={{
              width: GS(14),
              height: GS(14),
              borderRadius: GS(7),
              backgroundColor: values.colors.blue,
            }}
          />
        )}
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

export default MyRadio;
