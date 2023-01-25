import React, { useCallback, useState } from "react";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyHeader from "../../myTemplates/MyHeader";
import MyInput from "../../myComponents/MyInput";
import MyScrollView from "../../myComponents/MyScrollView";
import { GS } from "../../styles/sizes";
import MyLayout from "../../myTemplates/MyLayout";
import { useUser } from "../../contexts/user";
import { useToast } from "../../contexts/toast";
import { initialLoading, useLoading } from "../../contexts/loading";
import apis from "../../apis";

function ProfileLayout() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [businessNum, setBusinessNum] = useState(user.bizNum || "");
  const [companyName, setCompanyName] = useState(user.bizName || "");
  const [qualificationNum, setQualificationNum] = useState("");
  const [phoneNum, setPhoneNum] = useState(user.phoneNum || "");
  const { setToast } = useToast();
  const { setLoading } = useLoading();

  const signup = useCallback(async () => {
    setLoading("update");
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
      }
      // else if (qualificationNum.trim().length === 0) {
      //   setToast({
      //     msg: "올바른 자격번호를 입력해 주세요.",
      //   });
      // }
      else if (phoneNum.trim().length === 0) {
        setToast({
          msg: "올바른 전화번호를 입력해 주세요.",
        });
      } else {
        const data = {
          name,
          businessNum,
          companyName,
          qualificationNum,
          phoneNum,
          userId: user.id,
        };
        const result = await apis.user.update(data);
        if (!result.isSuccess) {
          setToast({
            msg: result.msg,
          });
        } else {
          const getUserResult = await apis.user.get();
          if (getUserResult.isSuccess && getUserResult.user) {
            setUser(getUserResult.user);
            setToast({
              msg: "내정보 수정이 완료되었습니다.",
            });
          } else {
            setToast({
              msg: getUserResult.msg,
            });
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
    phoneNum,
    qualificationNum,
    setLoading,
    setToast,
    setUser,
    user.id,
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
          내정보
        </MyText>
        <MyText
          font="nsb"
          style={{
            marginTop: GS(300),
            marginLeft: GS(20),
            fontSize: GS(40),
            color: "#888",
          }}
        >
          이름
        </MyText>
        <MyInput
          placeholder="이름"
          style={{
            marginTop: GS(20),
            borderWidth: GS(2),
            borderRadius: GS(30),
            paddingHorizontal: GS(30),
          }}
          value={name}
          onChangeText={setName}
        />
        <MyText
          font="nsb"
          style={{
            marginTop: GS(150),
            marginLeft: GS(20),
            fontSize: GS(40),
            color: "#888",
          }}
        >
          사업자번호
        </MyText>
        <MyInput
          placeholder="사업자번호"
          style={{
            marginTop: GS(20),
            borderWidth: GS(2),
            borderRadius: GS(30),
            paddingHorizontal: GS(30),
          }}
          value={businessNum}
          onChangeText={setBusinessNum}
        />
        <MyText
          font="nsb"
          style={{
            marginTop: GS(150),
            marginLeft: GS(20),
            fontSize: GS(40),
            color: "#888",
          }}
        >
          회사명
        </MyText>
        <MyInput
          placeholder="회사명"
          style={{
            marginTop: GS(20),
            borderWidth: GS(2),
            borderRadius: GS(30),
            paddingHorizontal: GS(30),
          }}
          value={companyName}
          onChangeText={setCompanyName}
        />
        <MyText
          font="nsb"
          style={{
            marginTop: GS(150),
            marginLeft: GS(20),
            fontSize: GS(40),
            color: "#888",
          }}
        >
          자격번호
        </MyText>
        <MyInput
          placeholder="자격번호"
          style={{
            marginTop: GS(20),
            borderWidth: GS(2),
            borderRadius: GS(30),
            paddingHorizontal: GS(30),
          }}
          value={qualificationNum}
          onChangeText={setQualificationNum}
        />
        <MyText
          font="nsb"
          style={{
            marginTop: GS(150),
            marginLeft: GS(20),
            fontSize: GS(40),
            color: "#888",
          }}
        >
          전화번호
        </MyText>
        <MyInput
          placeholder="전화번호"
          style={{
            marginTop: GS(20),
            borderWidth: GS(2),
            borderRadius: GS(30),
            paddingHorizontal: GS(30),
            marginBottom: GS(300),
          }}
          value={phoneNum}
          onChangeText={setPhoneNum}
        />
        {(() => {
          const isSame =
            user?.name === name &&
            user?.bizNum === businessNum &&
            user?.bizName === companyName &&
            user?.phoneNum === phoneNum;

          return (
            <MyTouch
              activeOpacity={0.8}
              onPress={() => {
                if (isSame) {
                  setToast({
                    msg: "수정된 정보가 없습니다.",
                  });
                } else {
                  signup();
                }
              }}
              style={{
                height: GS(160),
                backgroundColor: isSame ? "#888888" : values.colors.main,
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
                내정보 수정
              </MyText>
            </MyTouch>
          );
        })()}
      </MyScrollView>
    </MyLayout>
  );
}

export default ProfileLayout;
