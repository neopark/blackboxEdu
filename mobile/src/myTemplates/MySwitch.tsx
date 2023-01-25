import React, { useEffect, useRef, useState } from "react";
import { Pressable, Animated } from "react-native";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_MySwitchProps = {
  value: boolean;
  setValue: (value: boolean) => void;
};

function MySwitch({ value, setValue }: T_MySwitchProps) {
  const [isPress, setIsPress] = useState(false);
  const xPos = useRef(new Animated.Value(value ? 1 : 0)).current;
  const color = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    let toValue = isPress ? 0 : 0.1;
    if (value) {
      toValue = isPress ? 1 : 0.9;
    }
    const xPosAnim = Animated.timing(xPos, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    });
    xPosAnim.start();
  }, [xPos, isPress, value]);

  useEffect(() => {
    const xPosToValue = value ? 0.9 : 0.1;
    const colorToValue = value ? 1 : 0;
    const xPosAnim = Animated.timing(xPos, {
      toValue: xPosToValue,
      duration: 200,
      useNativeDriver: false,
    });
    const colorAnim = Animated.timing(color, {
      toValue: colorToValue,
      duration: 200,
      useNativeDriver: false,
    });
    xPosAnim.start();
    colorAnim.start();
    return () => {
      xPosAnim.stop();
      colorAnim.stop();
      xPos.setValue(xPosToValue);
      color.setValue(xPosToValue);
    };
  }, [color, value, xPos]);

  return (
    <Pressable
      onPress={() => {
        setValue(!value);
      }}
      onPressIn={() => {
        setIsPress(true);
      }}
      onPressOut={() => {
        setIsPress(false);
      }}
    >
      <Animated.View
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          height: GS(80),
          width: GS(160),
          borderRadius: GS(40),
          backgroundColor: color.interpolate({
            inputRange: [0, 1],
            outputRange: ["#dddddd", values.colors.blue],
          }),
        }}
      >
        <Animated.View
          style={{
            borderRadius: GS(30),
            width: GS(60),
            height: GS(60),
            backgroundColor: "#ffffff",
            transform: [
              {
                translateX: xPos.interpolate({
                  inputRange: [GS(0), GS(1)],
                  outputRange: [GS(3), GS(39)],
                }),
              },
            ],
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

export default MySwitch;
