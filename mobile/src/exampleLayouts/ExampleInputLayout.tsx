import React, { useState } from "react";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyText from "../myComponents/MyText";
import MyTextarea from "../myComponents/MyTextarea";
import MyInput from "../myComponents/MyInput";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import MyScrollView from "../myComponents/MyScrollView";
import MyCheckBox from "../myTemplates/MyCheckBox";
import MyRadio from "../myTemplates/MyRadio";
import MySwitch from "../myTemplates/MySwitch";
import MyLayout from "../myTemplates/MyLayout";

function ExampleInputLayout() {
  const [radioidx, setRadioIdx] = useState(1);
  const [isSwitch, setIsSwitch] = useState(false);
  const [isCheckBox1, setIsCheckBox1] = useState(false);
  const [isCheckBox2, setIsCheckBox2] = useState(false);
  const [inputText, setInputText] = useState("");
  const [textareaText, setTextareaText] = useState("");

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Input" />
      <MyScrollView
        onRefresh={() => {
          setRadioIdx(1);
          setIsSwitch(false);
          setInputText("");
          setIsCheckBox1(false);
          setIsCheckBox2(false);
          setTextareaText("");
        }}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingHorizontal: GS(20),
          paddingBottom: GS(20) + values.device.bottomSpaceHeight,
        }}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <MyText font="nsm">Check Box</MyText>
        <MyView
          style={{
            marginTop: GS(5),
          }}
        >
          <MySwitch value={isSwitch} setValue={setIsSwitch} />
        </MyView>
        <MyText
          style={{
            marginTop: GS(20),
          }}
          font="nsm"
        >
          Check Box
        </MyText>
        <MyView
          style={{
            flexDirection: "row",
            marginTop: GS(5),
          }}
        >
          <MyView
            style={{
              marginRight: GS(10),
            }}
          >
            <MyCheckBox value={isCheckBox1} setValue={setIsCheckBox1}>
              Value1
            </MyCheckBox>
          </MyView>
          <MyCheckBox value={isCheckBox2} setValue={setIsCheckBox2}>
            Value2
          </MyCheckBox>
        </MyView>
        <MyText
          style={{
            marginTop: GS(20),
          }}
          font="nsm"
        >
          Radio
        </MyText>
        <MyView
          style={{
            flexDirection: "row",
            marginTop: GS(5),
          }}
        >
          <MyView
            style={{
              marginRight: GS(10),
            }}
          >
            <MyRadio
              value={radioidx === 1}
              setValue={() => {
                setRadioIdx(1);
              }}
            >
              Value1
            </MyRadio>
          </MyView>
          <MyRadio
            value={radioidx === 2}
            setValue={() => {
              setRadioIdx(2);
            }}
          >
            Value2
          </MyRadio>
        </MyView>
        <MyText
          style={{
            marginTop: GS(20),
          }}
          font="nsm"
        >
          Input
        </MyText>
        <MyInput
          value={inputText}
          onChangeText={setInputText}
          style={{
            marginTop: GS(5),
          }}
          placeholder="Input"
        />
        <MyText
          style={{
            marginTop: GS(20),
          }}
          font="nsm"
        >
          Textarea
        </MyText>
        <MyTextarea
          value={textareaText}
          onChangeText={setTextareaText}
          style={{
            marginTop: GS(5),
          }}
          placeholder="Textarea"
        />
      </MyScrollView>
    </MyLayout>
  );
}

export default ExampleInputLayout;
