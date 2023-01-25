import React, { useState } from "react";
import MyView from "../../myComponents/MyView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyHeader from "../../myTemplates/MyHeader";
import MyText from "../../myComponents/MyText";
import MyImage from "../../myComponents/MyImage";
import MyTouch from "../../myComponents/MyTouch";
import useNav from "../../uses/useNav";
import { GS } from "../../styles/sizes";
import MySwitch from "../../myTemplates/MySwitch";
import { useAlert } from "../../contexts/alert";
import MyLayout from "../../myTemplates/MyLayout";
import { removeAccessToken } from "../../apis";
import storage from "../../modules/storage";
import { initialUser, useUser } from "../../contexts/user";

function IndexLayout() {
  const nav = useNav();
  const { setAlert } = useAlert();
  const { setUser } = useUser();
  const [isAlarmEnable, setIsAlarmEnable] = useState(false);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingBottom: GS(82) + values.device.bottomSpaceHeight,
          paddingTop: GS(20),
        }}
      >
        <MyView
          style={{
            height: GS(400),
            paddingHorizontal: GS(82),
          }}
        >
          <MyImage
            style={{
              marginTop: GS(50),
            }}
            name="top_icon2"
          />
          <MyText
            font="nsb"
            style={{
              marginTop: GS(10),
              fontSize: GS(80),
              color: values.colors.main,
            }}
          >
            EB100설정
          </MyText>
        </MyView>
        <MyView
          style={{
            height: GS(30),
            backgroundColor: "#f1f2f5",
          }}
        />
        <MyView
          style={{
            marginHorizontal: GS(82),
            paddingTop: GS(30),
          }}
        >
          <MyTouch
            onPress={() => {
              nav.navigate("CheckListLayout");
            }}
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: values.colors.main,
              }}
              font="nsb"
            >
              점검이력
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage name="detailview_white" />
            </MyView>
          </MyTouch>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyTouch
            onPress={() => {
              nav.navigate("PartChangeLayout");
            }}
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: values.colors.sub2,
              }}
              font="nsb"
            >
              부품교환 이력
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage name="detailview_white" />
            </MyView>
          </MyTouch>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyTouch
            onPress={() => {
              nav.navigate("TroubleshootingLayout");
            }}
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: values.colors.sub,
              }}
              font="nsb"
            >
              고장처리 이력
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage name="detailview_white" />
            </MyView>
          </MyTouch>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyTouch
            onPress={() => {
              nav.navigate("ProfileLayout");
            }}
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: "#333333",
              }}
            >
              내정보 변경
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage name="detailview_white" />
            </MyView>
          </MyTouch>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyTouch
            onPress={() => {
              nav.navigate("SnsSettingsLayout");
            }}
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: "#333333",
              }}
            >
              SNS 연동 관리
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage name="detailview_white" />
            </MyView>
          </MyTouch>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyView
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: "#333333",
              }}
            >
              알림설정
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MySwitch value={isAlarmEnable} setValue={setIsAlarmEnable} />
            </MyView>
          </MyView>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyView
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyText
              style={{
                color: "#333333",
              }}
            >
              앱버전정보
            </MyText>
            <MyView
              style={{
                flex: 1,
                justifyContent: "flex-end",
                marginRight: GS(10),
                flexDirection: "row",
              }}
            >
              <MyView
                style={{
                  height: GS(60),
                  marginRight: GS(20),
                  justifyContent: "flex-end",
                }}
              >
                <MyText
                  style={{
                    fontSize: GS(40),
                    color: "#999999",
                  }}
                >
                  VER {values.app.version.name}
                </MyText>
              </MyView>
              <MyTouch
                onPress={() => {
                  //
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: GS(160),
                  borderRadius: GS(5),
                  height: GS(60),
                  backgroundColor: "#109b4a",
                }}
              >
                <MyText
                  font="nsm"
                  style={{
                    fontSize: GS(30),
                    color: "#ffffff",
                  }}
                >
                  업데이트
                </MyText>
              </MyTouch>
            </MyView>
          </MyView>
          <MyView
            style={{
              height: GS(2),
              backgroundColor: "#dddddd",
            }}
          />
          <MyView
            style={{
              height: GS(140),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyTouch
              onPress={() => {
                setAlert({
                  msg: "정말로 로그아웃 하시겠습니까?",
                  buttonList: [
                    {
                      text: "취소",
                    },
                    {
                      text: "로그아웃",
                      color: values.colors.blue,
                      onPress: async () => {
                        removeAccessToken();
                        await storage.remove("refreshToken");
                        setUser(initialUser);
                        nav.reset("SigninLayout");
                      },
                    },
                  ],
                });
              }}
              style={{
                padding: GS(20),
                left: -GS(20),
              }}
            >
              <MyText
                style={{
                  color: "#333333",
                }}
              >
                로그아웃
              </MyText>
            </MyTouch>
          </MyView>
        </MyView>
      </MyView>
    </MyLayout>
  );
}

export default IndexLayout;
