import React from "react";
import MyHeader from "../../myTemplates/MyHeader";
import MyStatusBar from "../../myComponents/MyStatusBar";
import MyView from "../../myComponents/MyView";
import { GS } from "../../styles/sizes";
import values from "../../values";
import useNavParams from "../../uses/useNavParams";
import MyLayout from "../../myTemplates/MyLayout";

function ExamplePageDrawer() {
  const navParams = useNavParams();

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="menu" title={navParams.title} />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingTop: GS(25),
          paddingHorizontal: GS(25),
          paddingBottom: GS(25) + values.device.bottomSpaceHeight,
        }}
      />
    </MyLayout>
  );
}

export default ExamplePageDrawer;
