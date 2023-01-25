import React, { useCallback } from "react";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import { useToast } from "../contexts/toast";
import snss, { T_snsType } from "../modules/snss";
import MyButton from "../myTemplates/MyButton";
import MyLayout from "../myTemplates/MyLayout";

function ExampleSnsSigninLayout() {
  const { setToast } = useToast();

  const signinSns = useCallback(
    async (type: T_snsType) => {
      try {
        const profile = await snss.signin(type);
        if (profile) {
          setToast({
            msg: profile.id,
          });
        }
      } catch (err) {
        setToast({
          msg: `알 수 없는 오류로 '카카오' 로그인에 실패했습니다. 잠시 후 다시 로그인해 주세요.`,
        });
        await snss.signout("kakao");
      }
    },
    [setToast]
  );

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Sns Signin" />
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
              signinSns("kakao");
            }}
          >
            Signin Kakao
          </MyButton>
          <MyButton
            onPress={() => {
              signinSns("naver");
            }}
          >
            Signin Naver
          </MyButton>
          <MyButton
            onPress={async () => {
              signinSns("google");
            }}
          >
            Signin Google
          </MyButton>
          <MyButton
            onPress={async () => {
              signinSns("apple");
            }}
          >
            Signin Apple
          </MyButton>
        </MyView>
      </MyView>
    </MyLayout>
  );
}

export default ExampleSnsSigninLayout;
