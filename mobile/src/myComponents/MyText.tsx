import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { getFont, T_font } from "../styles/font";
import { GS } from "../styles/sizes";

export interface MyTextType extends Text {}

export interface T_MyTextProps extends TextProps {
  font?: T_font;
}

const MyText = React.forwardRef<MyTextType, T_MyTextProps>((props, ref) => {
  const { font } = props;
  const style = props.style as TextStyle;
  const fontSize = style?.fontSize || GS(45);

  return (
    <Text
      {...props}
      ref={ref}
      allowFontScaling={props.allowFontScaling || false}
      style={{
        color: "#111111",
        fontSize,
        lineHeight: fontSize * 1.5,
        borderColor: "#eeeeee",
        fontFamily: getFont(font),
        ...style,
      }}
    />
  );
});

export default MyText;
