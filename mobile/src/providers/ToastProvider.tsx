import React, { useEffect, useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";
import { initialToast, useToast } from "../contexts/toast";
import MyText from "../myComponents/MyText";
import MyView from "../myComponents/MyView";
import { getShadow } from "../styles/shadow";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_ToastProviderProps = {
  children: JSX.Element;
};

function ToastProvider({ children }: T_ToastProviderProps) {
  const { toast, setToast } = useToast();
  const [tempToast, setTempToast] = useState(initialToast);
  const [isShadowVisible, setIsShadowVisible] = useState(values.device.isIos);
  const bottom = values.device.bottomSpaceHeight + (tempToast.bottom || 0);
  const opacity = useRef(new Animated.Value(0)).current;
  const keyboardHeight = useRef(new Animated.Value(GS(25) + bottom)).current;

  useEffect(() => {
    if (!values.device.isIos) {
      if (toast.msg) {
        const timeout = setTimeout(() => {
          setIsShadowVisible(true);
        }, 200);
        return () => {
          clearTimeout(timeout);
        };
      } else {
        setIsShadowVisible(false);
      }
    }
  }, [toast]);

  useEffect(() => {
    const toValue = toast.msg ? 1 : 0;
    const anim = Animated.timing(opacity, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    });
    anim.start();
    return () => {
      anim.stop();
      opacity.setValue(toValue);
    };
  }, [opacity, toast]);

  useEffect(() => {
    if (toast.msg) {
      setTempToast(toast);
      const timeout = setTimeout(() => {
        setToast(initialToast);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      const timeout = setTimeout(() => {
        setTempToast(initialToast);
      }, 200);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [setToast, toast]);

  useEffect(() => {
    if (values.device.isIos) {
      const keyboardWillShow = Keyboard.addListener("keyboardWillShow", (evt) => {
        Animated.spring(keyboardHeight, {
          toValue: GS(75) + (tempToast.bottom || 0) + evt.endCoordinates.height,
          useNativeDriver: false,
          speed: 10,
          bounciness: 90,
        }).start();
      });
      const keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
        Animated.spring(keyboardHeight, {
          toValue: GS(75) + values.device.bottomSpaceHeight + (tempToast.bottom || 0),
          useNativeDriver: false,
          speed: 10,
          bounciness: 90,
        }).start();
      });
      return () => {
        keyboardWillShow.remove();
        keyboardWillHide.remove();
      };
    }
  }, [keyboardHeight, tempToast]);

  return (
    <>
      {children}
      <Animated.View
        style={{
          bottom: keyboardHeight,
          left: GS(0),
          width: values.device.width,
          opacity,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
        pointerEvents="none"
      >
        <MyView
          style={{
            maxWidth: values.device.width - GS(120),
            borderRadius: GS(15),
            backgroundColor: "#ffffff",
            ...(isShadowVisible ? getShadow() : undefined),
          }}
        >
          <MyText
            style={{
              fontSize: GS(30),
              paddingVertical: GS(30),
              paddingHorizontal: GS(40),
            }}
          >
            {tempToast.msg}
          </MyText>
        </MyView>
      </Animated.View>
    </>
  );
}

export default ToastProvider;
