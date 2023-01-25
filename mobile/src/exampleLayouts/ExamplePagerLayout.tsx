import React, { useRef, useState } from "react";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import { PagerView } from "react-native-pager-view";
import MyText from "../myComponents/MyText";
import MyImage from "../myComponents/MyImage";
import MyTouch from "../myComponents/MyTouch";
import MyIcon from "../myComponents/MyIcon";
import MyLayout from "../myTemplates/MyLayout";

function ExamplePagerLayout() {
  const ref = useRef<PagerView>(null);
  const [curPage, setCurPage] = useState(0);
  const totalPage = 5;

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Pager" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        <PagerView
          ref={ref}
          onPageSelected={(evt) => {
            setCurPage(evt.nativeEvent.position);
          }}
          style={{
            width: "100%",
            height: values.device.width / 1.5,
          }}
          initialPage={curPage}
        >
          <MyImage name="image_0" />
          <MyImage name="image_1" />
          <MyImage name="image_2" />
          <MyImage name="image_3" />
          <MyImage name="image_4" />
        </PagerView>
        <MyView
          pointerEvents="none"
          style={{
            position: "absolute",
            top: GS(0),
            left: GS(0),
            width: "100%",
            height: values.device.width / 1.5,
            backgroundColor: "#ffffff22",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <MyText
            font="nsb"
            style={{
              fontSize: GS(40),
              color: "#ffffff22",
            }}
          >
            {curPage + 1}
          </MyText>
        </MyView>
        {curPage !== 0 && (
          <MyTouch
            onPress={() => {
              if (ref.current) {
                ref.current.setPage(curPage - 1);
              }
            }}
            style={{
              padding: GS(10),
              left: GS(10),
              position: "absolute",
              top: values.device.width / 1.5 / 2 - GS(25),
            }}
          >
            <MyIcon name="left" color="#ffffff22" size={GS(30)} />
          </MyTouch>
        )}
        {curPage + 1 < totalPage && (
          <MyTouch
            onPress={() => {
              if (ref.current) {
                ref.current.setPage(curPage + 1);
              }
            }}
            style={{
              padding: GS(10),
              position: "absolute",
              top: values.device.width / 1.5 / 2 - GS(25),
              right: GS(10),
            }}
          >
            <MyIcon name="right" color="#ffffff22" size={GS(30)} />
          </MyTouch>
        )}
      </MyView>
    </MyLayout>
  );
}

export default ExamplePagerLayout;
