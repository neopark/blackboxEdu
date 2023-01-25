import React from "react";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyHeader from "../../myTemplates/MyHeader";
import MyText from "../../myComponents/MyText";
import MyScrollView from "../../myComponents/MyScrollView";
import { GS } from "../../styles/sizes";
import useNavParams from "../../uses/useNavParams";
import { T_terms } from "../../apis/terms";
import MyLayout from "../../myTemplates/MyLayout";

function TermsDetailLayout() {
  const navParams = useNavParams();
  const terms: T_terms = navParams.terms;

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" />
      <MyScrollView
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingHorizontal: GS(82),
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <MyText
          font="nsb"
          style={{
            marginTop: GS(50),
            fontSize: GS(80),
            color: values.colors.main,
          }}
        >
          {terms.title}
        </MyText>
        <MyText
          style={{
            marginTop: GS(90),
            lineHeight: GS(80),
            fontSize: GS(40),
            color: "#333333",
          }}
        >
          {terms.text}
        </MyText>
      </MyScrollView>
    </MyLayout>
  );
}

export default TermsDetailLayout;
