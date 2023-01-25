import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Keyboard } from "react-native";
import { initialAlert, useAlert } from "../contexts/alert";
import MyOutsideTouch from "../myComponents/MyOutsideTouch";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import { getShadow } from "../styles/shadow";
import values from "../values";

export type T_AlertProviderProps = {
  children: JSX.Element;
};

function AlertProvider({ children }: T_AlertProviderProps) {
  const { alert, setAlert } = useAlert();
  const opacity = useRef(new Animated.Value(0)).current;
  const [tempAlert, setTempAlert] = useState(initialAlert);
  const [isShadowVisible, setIsShadowVisible] = useState(values.device.isIos);
  let buttonList = tempAlert.buttonList;
  if (!buttonList || !buttonList.length) {
    const defaultButton = {
      text: "확인",
      color: values.colors.blue,
    };
    buttonList = [defaultButton];
  }

  const hide = useCallback(() => {
    if (alert.onHide) {
      alert.onHide();
    }
    setAlert(initialAlert);
  }, [alert, setAlert]);

  useEffect(() => {
    if (alert.msg) {
      setTempAlert(alert);
      if (!values.device.isIos) {
        const timeout = setTimeout(() => {
          setIsShadowVisible(true);
        }, 200);
        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      if (!values.device.isIos) {
        setIsShadowVisible(false);
      }
      const timeout = setTimeout(() => {
        setTempAlert(initialAlert);
      }, 200);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert]);

  useEffect(() => {
    const toValue = alert.msg ? 1 : 0;
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
  }, [alert, opacity]);

  useEffect(() => {
    if (alert.msg) {
      Keyboard.dismiss();
      const hardwareBackPress = BackHandler.addEventListener("hardwareBackPress", () => {
        hide();
        return true;
      });
      return () => {
        hardwareBackPress.remove();
      };
    }
  }, [alert, hide]);

  return (
    <>
      {children}
      <MyOutsideTouch onPress={hide}>
        <Animated.View
          pointerEvents={tempAlert.msg ? "auto" : "none"}
          style={{
            top: GS(0),
            left: GS(0),
            width: values.device.width,
            height: values.device.height,
            opacity,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: values.colors.overlay,
          }}
        >
          <MyOutsideTouch>
            <MyView
              style={{
                width: values.device.width - GS(150),
                borderRadius: GS(30),
                backgroundColor: "#ffffff",
                ...(isShadowVisible ? getShadow() : undefined),
              }}
            >
              <MyView
                style={{
                  paddingTop: GS(60),
                  paddingHorizontal: GS(60),
                }}
              >
                <MyText
                  style={{
                    fontSize: GS(40),
                  }}
                >
                  {tempAlert.msg}
                </MyText>
              </MyView>
              <MyView
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: GS(15),
                  marginTop: GS(30),
                  marginBottom: GS(30),
                }}
              >
                {buttonList.map((button, idx) => {
                  return (
                    <MyTouch
                      key={idx}
                      onPress={() => {
                        if (button.onPress) {
                          button.onPress();
                          setAlert(initialAlert);
                        } else {
                          hide();
                        }
                      }}
                      style={{
                        paddingVertical: GS(30),
                        paddingHorizontal: GS(45),
                      }}
                    >
                      <MyText
                        font="nsm"
                        style={{
                          color: button.color || "#888888",
                          fontSize: GS(40),
                        }}
                      >
                        {button.text}
                      </MyText>
                    </MyTouch>
                  );
                })}
              </MyView>
            </MyView>
          </MyOutsideTouch>
        </Animated.View>
      </MyOutsideTouch>
    </>
  );
}

export default AlertProvider;
