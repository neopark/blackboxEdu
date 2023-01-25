import React, { useCallback, useEffect, useState } from "react";
import MyView from "../myComponents/MyView";
import RNBootSplash from "react-native-bootsplash";
import MyStatusBar from "../myComponents/MyStatusBar";
import useNav from "../uses/useNav";
import values from "../values";
import { GS } from "../styles/sizes";
import MyImage from "../myComponents/MyImage";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyModal from "../myTemplates/MyModal";
import MyLayout from "../myTemplates/MyLayout";
import snss, { T_snsType } from "../modules/snss";
import { useToast } from "../contexts/toast";
import apis, { removeAccessToken, setAccessToken } from "../apis";
import fcm from "../modules/fcm";
import { T_userSigninData } from "../apis/user";
import { useAlert } from "../contexts/alert";
import storage from "../modules/storage";
import { useUser } from "../contexts/user";
import { initialLoading, useLoading } from "../contexts/loading";

function SigninLayout() {
  const nav = useNav();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setToast } = useToast();
  const { setAlert } = useAlert();
  const { setUser } = useUser();
  const { setLoading } = useLoading();

  const signin = useCallback(
    async (snsType: T_snsType) => {
      setLoading("signin");
      try {
        const fcmToken = await fcm.getToken();
        const profile = await snss.signin(snsType);
        if (profile?.id) {
          const data: T_userSigninData = {
            userId: profile.id,
            snsType: snsType,
            deviceType: values.device.isIos ? "ios" : "android",
            deviceId: values.device.id,
            fcmToken,
          };
          const result = await apis.user.signin(data);
          if (!result.isSuccess) {
            if (result.msg === "가입되지 않은 아이디입니다.") {
              setAlert({
                msg: "가입되지 않은 아이디입니다. 회원가입을 진행하시겠습니까?",
                buttonList: [
                  {
                    text: "취소",
                  },
                  {
                    text: "확인",
                    color: values.colors.blue,
                    onPress: () => {
                      nav.navigate("SignupLayout", data);
                    },
                  },
                ],
              });
            } else {
              setToast({
                msg: result.msg,
              });
            }
          } else if (result.accessToken && result.refreshToken) {
            await setAccessToken(result.accessToken);
            const getUserResult = await apis.user.get();
            if (!getUserResult.isSuccess) {
              await removeAccessToken();
              setToast({
                msg: getUserResult.msg,
              });
            } else if (getUserResult.user) {
              await storage.set("refreshToken", {
                refreshToken: result.refreshToken,
              });
              setUser(getUserResult.user);
              nav.reset("HomeLayout");
            }
          }
        }
      } catch (err: any) {
        setToast({
          msg: err.message,
        });
      }
      setLoading(initialLoading);
    },
    [nav, setAlert, setLoading, setToast, setUser]
  );

  useEffect(() => {
    RNBootSplash.hide({
      fade: true,
    });
  }, []);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingBottom: GS(82) + values.device.bottomSpaceHeight,
          paddingHorizontal: GS(82),
          paddingTop: GS(82),
        }}
      >
        <MyImage
          style={{
            marginTop: GS(110),
          }}
          name="top_icon2"
        />
        <MyText
          font="nsb"
          style={{
            marginTop: GS(50),
            fontSize: GS(80),
            color: values.colors.main,
          }}
        >
          EB100 점검을 위해{"\n"}
          먼저 로그인 해주세요.
        </MyText>
        <MyText
          style={{
            marginTop: GS(130),
            fontSize: GS(50),
            color: "#222222",
          }}
        >
          이용을 위해 다양한 방법으로{"\n"}로그인 하실 수 있습니다.
        </MyText>
        <MyView
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <MyTouch
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={{
              height: GS(160),
              backgroundColor: values.colors.main,
              borderRadius: GS(20),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText
              font="nsm"
              style={{
                color: "#ffffff",
              }}
            >
              SNS 계정으로 시작하기
            </MyText>
          </MyTouch>
        </MyView>
      </MyView>
      <>
        {isModalVisible && (
          <MyModal
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
            isBottom={true}
            style={{
              width: values.device.width,
              backgroundColor: "#ffffff",
              borderTopRightRadius: GS(20),
              borderTopLeftRadius: GS(20),
              paddingHorizontal: GS(82),
            }}
          >
            <MyText
              font="nsb"
              style={{
                fontSize: GS(60),
                color: values.colors.main,
                marginTop: GS(82),
              }}
            >
              SNS 계정으로 시작하기
            </MyText>
            <MyText
              style={{
                color: "#333333",
                marginTop: GS(50),
                marginBottom: GS(100),
              }}
            >
              사용중인 SNS 계정으로{"\n"}간편하게 시작하세요.
            </MyText>
            <MyView
              style={{
                flexDirection: "row",
                marginBottom: GS(82),
              }}
            >
              <MyTouch
                onPress={() => {
                  signin("apple");
                }}
                style={{
                  marginRight: GS(35),
                }}
              >
                <MyImage name="ico_apple" />
              </MyTouch>
              <MyTouch
                onPress={() => {
                  signin("google");
                }}
                style={{
                  marginRight: GS(35),
                }}
              >
                <MyImage name="ico_google" />
              </MyTouch>
              <MyTouch
                onPress={() => {
                  signin("kakao");
                }}
                style={{
                  marginRight: GS(35),
                }}
              >
                <MyImage name="ico_kakao" />
              </MyTouch>
              <MyTouch
                onPress={() => {
                  signin("naver");
                }}
              >
                <MyImage name="ico_naver" />
              </MyTouch>
            </MyView>
            <MyTouch
              onPress={() => {
                setIsModalVisible(false);
              }}
              style={{
                position: "absolute",
                top: GS(40),
                right: GS(40),
                padding: GS(20),
              }}
            >
              <MyImage name="closed" />
            </MyTouch>
          </MyModal>
        )}
      </>
    </MyLayout>
  );
}

export default SigninLayout;
