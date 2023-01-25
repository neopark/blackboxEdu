import React, { useState } from "react";
import { TextInput, TextInputProps, TextStyle } from "react-native";
import { GS } from "../styles/sizes";
import values from "../values";
import MyText from "./MyText";
import MyTouch, { T_MyTouchProps } from "./MyTouch";

export interface MyInputType extends TextInput {}

export interface T_MyInputProps extends TextInputProps {
  touchProps?: T_MyTouchProps;
}

const MyInput = React.forwardRef<MyInputType, T_MyInputProps>((props, ref) => {
  const { touchProps } = props;
  const [isFocus, setIsFocus] = useState(false);
  const style = props.style as TextStyle;
  const height = GS(130);
  const padding = GS(20);
  const fontSize = style?.fontSize || GS(45);
  const borderBottomWidth = GS(2);
  const placeholderTextColor = "#bbbbbb";
  let color = "#111111";

  if (touchProps) {
    const newProps = {
      ...props,
    };
    delete newProps.touchProps;
    if (!props.value) {
      if (props.placeholder) {
        newProps.children = props.placeholder;
        color = (props.placeholderTextColor as string) || placeholderTextColor;
      }
    } else {
      newProps.children = props.value;
    }

    return (
      <MyTouch {...touchProps}>
        <MyText
          {...newProps}
          font={null}
          style={{
            color,
            height,
            padding,
            paddingTop: GS(values.device.isIos ? padding + 6 : padding + 4),
            borderBottomWidth,
            ...style,
          }}
        />
      </MyTouch>
    );
  } else {
    return (
      <TextInput
        {...props}
        ref={ref}
        onBlur={(evt) => {
          setIsFocus(false);
          if (props.onFocus) {
            props.onFocus(evt);
          }
        }}
        onFocus={(evt) => {
          setIsFocus(true);
          if (props.onFocus) {
            props.onFocus(evt);
          }
        }}
        selectionColor={props.selectionColor || values.colors.blue}
        allowFontScaling={props.allowFontScaling || false}
        placeholderTextColor={props.placeholderTextColor || placeholderTextColor}
        style={{
          color,
          height,
          padding,
          fontSize,
          paddingTop: GS(props.multiline ? padding + 4 : padding),
          lineHeight: fontSize * 1.5,
          borderColor: isFocus ? values.colors.blue : "#eeeeee",
          borderBottomWidth,
          ...style,
        }}
      />
    );
  }
});

export default MyInput;
