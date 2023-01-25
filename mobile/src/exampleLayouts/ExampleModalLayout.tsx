import React, { useRef, useState } from "react";
import MyButton from "../myTemplates/MyButton";
import MyHeader from "../myTemplates/MyHeader";
import MyIcon from "../myComponents/MyIcon";
import MyInput, { MyInputType } from "../myComponents/MyInput";
import MyModal from "../myTemplates/MyModal";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import MyOutsideTouch from "../myComponents/MyOutsideTouch";
import { Keyboard } from "react-native";
import MyLayout from "../myTemplates/MyLayout";

function ExampleModalLayout() {
  const inputRef = useRef<MyInputType>(null);
  const [isCenterModalVisible, setIsCenterModalVisible] = useState(false);
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);
  const [isCenterInputModalVisible, setIsCenterInputModalVisible] = useState(false);
  const [isBottomInputModalVisible, setIsBottomInputModalVisible] = useState(false);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Modal" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingTop: GS(15),
          paddingHorizontal: GS(15),
          paddingBottom: GS(15) + values.device.bottomSpaceHeight,
        }}
      >
        <MyView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <MyButton
            onPress={() => {
              setIsCenterModalVisible(true);
            }}
          >
            Show Center Modal
          </MyButton>
          <MyButton
            onPress={() => {
              setIsBottomModalVisible(true);
            }}
          >
            Show Bottom Modal
          </MyButton>
          <MyButton
            onPress={() => {
              setIsCenterInputModalVisible(true);
            }}
          >
            Show Center Input Modal
          </MyButton>
          <MyButton
            onPress={() => {
              setIsBottomInputModalVisible(true);
            }}
          >
            Show Bottom Input Modal
          </MyButton>
        </MyView>
      </MyView>
      <MyModal
        isVisible={isCenterModalVisible}
        setIsVisible={setIsCenterModalVisible}
        style={{
          width: values.device.width - GS(100),
          borderRadius: GS(10),
        }}
      >
        <MyText
          font="nsm"
          style={{
            marginHorizontal: GS(20),
            fontSize: GS(15),
            marginTop: GS(20),
          }}
        >
          Center Modal
        </MyText>
        <MyText
          style={{
            marginTop: GS(20),
            marginHorizontal: GS(20),
          }}
        >
          message
        </MyText>
        <MyView
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: GS(10),
            marginTop: GS(10),
            marginBottom: GS(10),
          }}
        >
          <MyTouch
            style={{
              padding: GS(10),
            }}
            onPress={() => {
              setIsCenterModalVisible(false);
            }}
          >
            <MyText
              font="nsm"
              style={{
                color: values.colors.blue,
                fontSize: GS(13),
              }}
            >
              Confirm
            </MyText>
          </MyTouch>
        </MyView>
      </MyModal>
      <MyModal
        isVisible={isBottomModalVisible}
        isBottom={true}
        setIsVisible={setIsBottomModalVisible}
        style={{
          position: "relative",
          width: values.device.width,
          borderTopLeftRadius: GS(10),
          borderTopRightRadius: GS(10),
        }}
      >
        <MyText
          font="nsm"
          style={{
            fontSize: GS(15),
            marginTop: GS(20),
            marginHorizontal: GS(20),
          }}
        >
          Bottom Modal
        </MyText>
        <MyText
          style={{
            marginTop: GS(20),
            marginHorizontal: GS(20),
            marginBottom: GS(20),
          }}
        >
          message
        </MyText>
        <MyTouch
          onPress={() => {
            setIsBottomModalVisible(false);
          }}
          style={{
            padding: GS(10),
            position: "absolute",
            top: GS(10),
            right: GS(10),
          }}
        >
          <MyIcon color="#888888" name="close" />
        </MyTouch>
      </MyModal>
      <MyModal
        isVisible={isCenterInputModalVisible}
        setIsVisible={setIsCenterInputModalVisible}
        style={{
          width: values.device.width - GS(100),
          borderRadius: GS(10),
        }}
      >
        <MyOutsideTouch onPress={Keyboard.dismiss}>
          <MyView>
            <MyText
              font="nsm"
              style={{
                marginTop: GS(20),
                marginHorizontal: GS(20),
                fontSize: GS(15),
              }}
            >
              Center Input Modal
            </MyText>
            <MyInput
              style={{
                marginHorizontal: GS(20),
                marginTop: GS(20),
              }}
              placeholder="Input"
            />
            <MyView
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginHorizontal: GS(10),
                marginTop: GS(10),
                marginBottom: GS(10),
              }}
            >
              <MyTouch
                style={{
                  padding: GS(10),
                }}
                onPress={() => {
                  setIsCenterInputModalVisible(false);
                }}
              >
                <MyText
                  font="nsm"
                  style={{
                    color: values.colors.blue,
                    fontSize: GS(13),
                  }}
                >
                  Send
                </MyText>
              </MyTouch>
            </MyView>
          </MyView>
        </MyOutsideTouch>
      </MyModal>
      <MyModal
        isVisible={isBottomInputModalVisible}
        setIsVisible={setIsBottomInputModalVisible}
        isOverlayDisable={true}
        level={2}
        onLoad={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        style={{
          width: values.device.width,
        }}
        isBottom={true}
      >
        <MyInput
          ref={inputRef}
          style={{
            height: GS(60),
            borderWidth: GS(0),
            borderTopWidth: GS(1),
            borderRadius: GS(0),
            borderColor: "#eeeeee",
          }}
          placeholder="Input"
        />
      </MyModal>
    </MyLayout>
  );
}

export default ExampleModalLayout;
