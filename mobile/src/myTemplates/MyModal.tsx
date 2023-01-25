import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Keyboard, ViewStyle } from "react-native";
import { initialLoading, useLoading } from "../contexts/loading";
import MyOutsideTouch from "../myComponents/MyOutsideTouch";
import MyView from "../myComponents/MyView";
import { getShadow } from "../styles/shadow";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_MyModalProps = {
  style?: ViewStyle;
  isBottom?: boolean;
  level?: number;
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
  isOverlayDisable?: boolean;
  onLoad?: () => void;
  setIsVisible: (isVisible: boolean) => void;
};

function MyModal({
  style,
  isBottom,
  level,
  children,
  isVisible,
  isOverlayDisable,
  onLoad,
  setIsVisible,
}: T_MyModalProps) {
  const { setLoading } = useLoading();
  const [isInit, setIsInit] = useState(true);
  const [modalHeight, setModalHeight] = useState(0);
  const [isKeyboardEnable, setIsKeyboardEnable] = useState(false);
  const [isShadowVisible, setIsShadowVisible] = useState(values.device.isIos);
  const opacity = useRef(new Animated.Value(0)).current;
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  let overlayPaddingBottom: Animated.Value | undefined = keyboardHeight;
  if (isBottom) {
    if (values.device.isIos) {
      overlayPaddingBottom = keyboardHeight;
    } else {
      overlayPaddingBottom = undefined;
    }
  }

  useEffect(() => {
    if (isVisible) {
      setIsInit(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      return () => {
        setLoading(initialLoading);
      };
    }
  }, [isVisible, setLoading]);

  useEffect(() => {
    if (!isInit && onLoad) {
      setIsInit(true);
      onLoad();
    }
  }, [isInit, onLoad]);

  useEffect(() => {
    if (!values.device.isIos) {
      if (isVisible) {
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
  }, [isVisible]);

  useEffect(() => {
    const toValue = isVisible ? 1 : 0;
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
  }, [opacity, isVisible]);

  useEffect(() => {
    if (isVisible) {
      const hardwareBackPress = BackHandler.addEventListener("hardwareBackPress", () => {
        setIsVisible(false);
        return true;
      });
      return () => {
        hardwareBackPress.remove();
      };
    }
  }, [isVisible, setIsVisible]);

  useEffect(() => {
    if (modalHeight) {
      const showType = `keyboard${values.device.isIos ? "Will" : "Did"}Show`;
      const hideType = `keyboard${values.device.isIos ? "Will" : "Did"}Hide`;
      const keyboardWillShow = Keyboard.addListener(showType as any, (evt) => {
        setIsKeyboardEnable(true);
        Animated.spring(keyboardHeight, {
          speed: values.device.isIos ? 10 : 20,
          toValue: evt.endCoordinates.height,
          bounciness: 90,
          useNativeDriver: false,
        }).start();
      });
      const keyboardWillHide = Keyboard.addListener(hideType as any, () => {
        setIsKeyboardEnable(false);
        Animated.spring(keyboardHeight, {
          speed: values.device.isIos ? 10 : 20,
          toValue: 0,
          bounciness: 90,
          useNativeDriver: false,
        }).start();
      });
      return () => {
        keyboardWillShow.remove();
        keyboardWillHide.remove();
      };
    }
  }, [keyboardHeight, isKeyboardEnable, modalHeight]);

  return (
    <MyOutsideTouch
      onPress={() => {
        if (isKeyboardEnable) {
          Keyboard.dismiss();
        } else {
          setIsVisible(false);
        }
      }}
    >
      <Animated.View
        pointerEvents={isVisible ? "auto" : "none"}
        style={{
          top: isBottom ? undefined : GS(0),
          left: GS(0),
          width: values.device.width,
          height: values.device.height,
          bottom: isBottom ? GS(0) : undefined,
          opacity,
          position: "absolute",
          alignItems: "center",
          justifyContent: isBottom ? "flex-end" : "center",
          backgroundColor: isOverlayDisable ? undefined : values.colors.overlay,
          paddingBottom: overlayPaddingBottom,
        }}
      >
        <MyOutsideTouch>
          <MyView
            onLayout={(evt) => {
              setModalHeight(evt.nativeEvent.layout.height);
            }}
            style={{
              backgroundColor: "#ffffff",
              ...style,
              paddingBottom:
                isBottom && !isKeyboardEnable ? values.device.bottomSpaceHeight : undefined,
              ...(isShadowVisible ? getShadow(level) : undefined),
            }}
          >
            {children}
          </MyView>
        </MyOutsideTouch>
      </Animated.View>
    </MyOutsideTouch>
  );
}

export default MyModal;
