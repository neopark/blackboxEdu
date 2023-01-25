import React, { useEffect } from "react";
import BootSplashModule from "react-native-bootsplash";
import MyHeader from "../myTemplates/MyHeader";
import MyScrollView from "../myComponents/MyScrollView";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyView from "../myComponents/MyView";
import useNav from "../uses/useNav";
import { GS } from "../styles/sizes";
import values from "../values";
import MyButton from "../myTemplates/MyButton";
import MyLayout from "../myTemplates/MyLayout";

function ExampleHomeLayout() {
  const nav = useNav();

  useEffect(() => {
    BootSplashModule.hide({
      fade: true,
    });
  }, []);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader title="Home" />
      <MyScrollView
        contentContainerStyle={{
          paddingTop: GS(15),
          paddingHorizontal: GS(15),
          paddingBottom: GS(15) + values.device.bottomSpaceHeight,
        }}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
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
              nav.navigate("ExampleInputLayout");
            }}
          >
            Go Input
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleDatePickerLayout");
            }}
          >
            Go Date Picker
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleImagePickerLayout");
            }}
          >
            Go Image Picker
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleModalLayout");
            }}
          >
            Go Modal
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleListLayout");
            }}
          >
            Go List
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExamplePagerLayout");
            }}
          >
            Go Pager
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleSnsSigninLayout");
            }}
          >
            Go Sns Signin
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleScanLayout");
            }}
          >
            Go Scan
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleTabLayout");
            }}
          >
            Go Tab
          </MyButton>
          <MyButton
            onPress={() => {
              nav.navigate("ExampleDrawerLayout");
            }}
          >
            Go Drawer
          </MyButton>
        </MyView>
      </MyScrollView>
    </MyLayout>
  );
}

export default ExampleHomeLayout;
