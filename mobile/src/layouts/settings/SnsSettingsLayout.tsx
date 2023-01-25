import React, { useCallback } from "react";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyText from "../../myComponents/MyText";
import MyHeader from "../../myTemplates/MyHeader";
import MyScrollView from "../../myComponents/MyScrollView";
import { GS } from "../../styles/sizes";
import MyLayout from "../../myTemplates/MyLayout";
import { useUser } from "../../contexts/user";
import { useToast } from "../../contexts/toast";
import { initialLoading, useLoading } from "../../contexts/loading";
import apis from "../../apis";
import MyView from "../../myComponents/MyView";
import MyTouch from "../../myComponents/MyTouch";
import MyImage from "../../myComponents/MyImage";
import snss, { T_snsType } from "../../modules/snss";

function SnsSettingsLayout() {
  const { user, setUser } = useUser();
  const { setToast } = useToast();
  const { loading, setLoading } = useLoading();

  const snsUpdate = useCallback(
    async (snsType: T_snsType, status: "insert" | "delete") => {
      setLoading("update");
      let snsId = "";
      try {
        console.log(status);
        if (status === "insert") {
          const profile = await snss.signin(snsType);
          if (profile) {
            snsId = profile.id;
          } else {
            setLoading(initialLoading);
            return;
          }
        } else {
          switch (snsType) {
            case "apple": {
              snsId = user.appleId;
              break;
            }
            case "kakao": {
              snsId = user.kakaoId;
              break;
            }
            case "naver": {
              snsId = user.naverId;
              break;
            }
            case "google": {
              snsId = user.googleId;
              break;
            }
          }
        }
        if (snsType + "_" + snsId === user.id) {
          setToast({
            msg: "최초 가입 시 연동한 SNS는 해제가 불가능 합니다.",
          });
        } else {
          const data = {
            userId: user.id,
            snsId,
            snsType,
            status,
          };
          const result = await apis.user.snsUpdate(data);
          if (!result.isSuccess) {
            setToast({
              msg: result.msg,
            });
          } else {
            const getUserResult = await apis.user.get();
            if (getUserResult.isSuccess && getUserResult.user) {
              setUser(getUserResult.user);
              if (status === "delete") {
                setToast({
                  msg: "SNS 연동 해제가 완료되었습니다.",
                });
              } else {
                setToast({
                  msg: "SNS 추가 연동이 완료되었습니다.",
                });
              }
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
    },
    [setLoading, setToast, setUser, user]
  );

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyScrollView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
        onInit={async () => {
          setLoading("init");
          // await getCheckRecord(1);
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          if (!loading) {
            // setCheckRecordList([]);
            // await getCheckRecord(1);
          }
        }}
        contentContainerStyle={{
          backgroundColor: "#ffffff",
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
      >
        <MyView
          style={{
            paddingTop: GS(20),
            height: GS(450),
            backgroundColor: "#f1f2f5",
            paddingHorizontal: GS(82),
          }}
        >
          <MyText
            font="nsb"
            style={{
              marginTop: GS(10),
              fontSize: GS(80),
              color: values.colors.main,
              height: GS(250),
            }}
          >
            SNS 연동 관리
          </MyText>
        </MyView>
        <MyView
          style={{
            paddingTop: GS(30),
            paddingHorizontal: GS(82),
            position: "relative",
          }}
        >
          <MyText
            font="nsb"
            style={{
              marginTop: GS(40),
              fontSize: GS(60),
              color: values.colors.main,
            }}
          >
            연동중인 SNS
          </MyText>
          <MyView>
            <MyView>
              <MyView
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: GS(20),
                  paddingRight: GS(60),
                  // marginBottom: GS(70),
                }}
              >
                <MyView
                  style={{
                    flexDirection: "row",
                    // marginBottom: GS(82),
                    marginTop: GS(60),
                  }}
                >
                  {!!user.appleId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("apple", "delete");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_apple" />
                    </MyTouch>
                  )}
                  {!!user.googleId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("google", "delete");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_google" />
                    </MyTouch>
                  )}
                  {!!user.kakaoId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("kakao", "delete");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_kakao" />
                    </MyTouch>
                  )}
                  {!!user.naverId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("naver", "delete");
                      }}
                    >
                      <MyImage name="ico_naver" />
                    </MyTouch>
                  )}
                </MyView>
              </MyView>
            </MyView>
          </MyView>
          <MyText
            font="nsb"
            style={{
              marginTop: GS(200),
              fontSize: GS(60),
              color: values.colors.main,
            }}
          >
            미연동 SNS
          </MyText>
          <MyView>
            <MyView>
              <MyView
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: GS(20),
                  paddingRight: GS(60),
                  // marginBottom: GS(70),
                }}
              >
                <MyView
                  style={{
                    flexDirection: "row",
                    // marginBottom: GS(82),
                    marginTop: GS(60),
                  }}
                >
                  {!user.appleId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("apple", "insert");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_apple" />
                    </MyTouch>
                  )}
                  {!user.googleId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("google", "insert");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_google" />
                    </MyTouch>
                  )}
                  {!user.kakaoId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("kakao", "insert");
                      }}
                      style={{
                        marginRight: GS(35),
                      }}
                    >
                      <MyImage name="ico_kakao" />
                    </MyTouch>
                  )}
                  {!user.naverId && (
                    <MyTouch
                      onPress={() => {
                        snsUpdate("naver", "insert");
                      }}
                    >
                      <MyImage name="ico_naver" />
                    </MyTouch>
                  )}
                </MyView>
              </MyView>
            </MyView>
          </MyView>
        </MyView>
      </MyScrollView>
    </MyLayout>
  );
}

export default SnsSettingsLayout;
