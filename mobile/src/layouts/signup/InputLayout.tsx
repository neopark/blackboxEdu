import React, { useCallback, useState } from "react";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyHeader from "../../myTemplates/MyHeader";
import MyInput from "../../myComponents/MyInput";
import MyScrollView from "../../myComponents/MyScrollView";
import useNav from "../../uses/useNav";
import { GS } from "../../styles/sizes";
import MyLayout from "../../myTemplates/MyLayout";
import useNavParams from "../../uses/useNavParams";
import { useToast } from "../../contexts/toast";
import apis, { removeAccessToken, setAccessToken } from "../../apis";
import { T_userSigninData, T_userSignupData } from "../../apis/user";
import { initialLoading, useLoading } from "../../contexts/loading";
import storage from "../../modules/storage";
import { useUser } from "../../contexts/user";

function InputLayout() {
  const nav = useNav();
  const params = useNavParams();
  const [name, setName] = useState("");
  const [businessNum, setBusinessNum] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [qualificationNum, setQualificationNum] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const { setToast } = useToast();
  const { setLoading } = useLoading();
  const { setUser } = useUser();

  const signup = useCallback(async () => {
    setLoading("signup");
    try {
      if (name.trim().length === 0) {
        setToast({
          msg: "올바른 이름을 입력해 주세요.",
        });
      } else if (businessNum.trim().length === 0) {
        setToast({
          msg: "올바른 사업자번호를 입력해 주세요.",
        });
      } else if (companyName.trim().length === 0) {
        setToast({
          msg: "올바른 회사명을 입력해 주세요.",
        });
      } else if (qualificationNum.trim().length === 0) {
        setToast({
          msg: "올바른 자격번호를 입력해 주세요.",
        });
      } else if (phoneNum.trim().length === 0) {
        setToast({
          msg: "올바른 전화번호를 입력해 주세요.",
        });
      } else {
        const data: T_userSignupData = {
          snsId: params.userId,
          snsType: params.snsType,
          name,
          businessNum,
          companyName,
          qualificationNum,
          phoneNum,
          fcmToken: params.fcmToken,
          deviceType: params.deviceType,
          deviceId: params.deviceId,
        };
        const result = await apis.user.signup(data);
        if (!result.isSuccess) {
          setToast({
            msg: result.msg,
          });
        } else {
          const signinData: T_userSigninData = {
            userId: params.userId,
            snsType: params.snsType,
            deviceType: values.device.isIos ? "ios" : "android",
            deviceId: values.device.id,
            fcmToken: params.fcmToken,
          };
          const signinResult = await apis.user.signin(signinData);
          if (!signinResult.isSuccess) {
            setToast({
              msg: signinResult.msg,
            });
          } else if (signinResult.accessToken && signinResult.refreshToken) {
            await setAccessToken(signinResult.accessToken);
            const getUserResult = await apis.user.get();
            if (!getUserResult.isSuccess) {
              await removeAccessToken();
              setToast({
                msg: getUserResult.msg,
              });
            } else if (getUserResult.user) {
              await storage.set("refreshToken", {
                refreshToken: signinResult.refreshToken,
              });
              setUser(getUserResult.user);
              setToast({
                msg: "회원가입이 완료되었습니다.",
              });
              nav.reset("HomeLayout");
            }
          }
        }
      }
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
    setLoading(initialLoading);
  }, [
    businessNum,
    companyName,
    name,
    nav,
    params.deviceId,
    params.deviceType,
    params.fcmToken,
    params.snsType,
    params.userId,
    phoneNum,
    qualificationNum,
    setLoading,
    setToast,
    setUser,
  ]);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" />
      <MyScrollView
        automaticallyAdjustKeyboardInsets={true}
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
          회원가입
        </MyText>
        <MyText
          style={{
            marginTop: GS(90),
            fontSize: GS(50),
            color: "#222222",
          }}
        >
          등록된 계정정보를 입력해주세요.{"\n"}계정이 없으신분은 간편회원 가입 버튼을{"\n"}
          눌러주세요.
        </MyText>
        <MyInput
          placeholder="성명"
          style={{
            marginTop: GS(300),
          }}
          value={name}
          onChangeText={setName}
        />
        <MyInput
          placeholder="사업자번호"
          style={{
            marginTop: GS(50),
          }}
          value={businessNum}
          onChangeText={setBusinessNum}
        />
        <MyInput
          placeholder="회사명"
          style={{
            marginTop: GS(50),
          }}
          value={companyName}
          onChangeText={setCompanyName}
        />
        <MyInput
          placeholder="자격번호"
          style={{
            marginTop: GS(50),
          }}
          value={qualificationNum}
          onChangeText={setQualificationNum}
        />
        <MyInput
          placeholder="전화번호"
          style={{
            marginTop: GS(50),
            marginBottom: GS(300),
          }}
          value={phoneNum}
          onChangeText={setPhoneNum}
        />
        <MyTouch
          onPress={signup}
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
            회원가입
          </MyText>
        </MyTouch>
      </MyScrollView>
    </MyLayout>
  );
}

export default InputLayout;
