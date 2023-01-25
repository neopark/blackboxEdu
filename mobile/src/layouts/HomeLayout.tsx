import React, { useCallback, useEffect, useState } from "react";
import MyView from "../myComponents/MyView";
import MyStatusBar from "../myComponents/MyStatusBar";
import values from "../values";
import { GS } from "../styles/sizes";
import MyImage from "../myComponents/MyImage";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyHeader from "../myTemplates/MyHeader";
import MyScrollView from "../myComponents/MyScrollView";
import useNav from "../uses/useNav";
import { T_notice } from "../apis/notice";
import { initialLoading, useLoading } from "../contexts/loading";
import { useToast } from "../contexts/toast";
import apis from "../apis";
import formats from "../modules/formats";
import HomeModal from "./home/HomeModal";
import RNBootSplash from "react-native-bootsplash";
import MyIcon from "../myComponents/MyIcon";
import { useAppState } from "../contexts/appState";
import permission from "../modules/permission";
import { useAlert } from "../contexts/alert";
import HomeDeviceListModal from "./home/HomeDeviceListModal";
import MyLayout from "../myTemplates/MyLayout";
import HomeImageSelectModal from "./home/HomeImageSelectModal";
import { Asset } from "react-native-image-picker";
import { useUser } from "../contexts/user";

export type T_action = "troubleshooting" | "partChange" | "check" | null;

function HomeLayout() {
  const nav = useNav();
  const { appState } = useAppState();
  const { setToast } = useToast();
  const { setAlert } = useAlert();
  const { loading, setLoading } = useLoading();
  const { user } = useUser();
  const [imageList, setImageList] = useState<Asset[]>([]);
  const [noticeList, setNoticeList] = useState<T_notice[]>([]);
  const [action, setAction] = useState<T_action>(null);
  const [modalAction, setModalAction] = useState<T_action>(null);
  const [isDeviceListModalVisible, setIsDeviceListModalVisible] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] = useState(false);

  const getNoticeList = useCallback(async () => {
    if (user.id) {
      try {
        const result = await apis.notice.get({
          page: 1,
          pagesize: 5,
          userId: user.id,
        });
        if (result.isSuccess) {
          setNoticeList(result.noticeList);
        } else {
          setToast({
            msg: result.msg,
          });
        }
      } catch (err: any) {
        setToast({
          msg: err.message,
        });
      }
    }
  }, [setToast, user]);

  const checkPermission = useCallback(async () => {
    if (values.device.isIos) {
      const msg = await permission.requestBluetooth();
      if (msg !== "success") {
        if (msg.includes("권한을 변경하시겠습니까?")) {
          setAlert({
            msg,
            buttonList: [
              {
                text: "취소",
              },
              {
                text: "확인",
                color: values.colors.blue,
                onPress: permission.openSettings,
              },
            ],
          });
        } else {
          setAlert({
            msg,
          });
        }
        return false;
      }
    }
    const msg = await permission.requestLocation();
    if (msg !== "success") {
      if (msg.includes("권한을 변경하시겠습니까?")) {
        setAlert({
          msg,
          buttonList: [
            {
              text: "취소",
            },
            {
              text: "확인",
              color: values.colors.blue,
              onPress: permission.openSettings,
            },
          ],
        });
      } else {
        setAlert({
          msg,
        });
      }
      return false;
    }
    return true;
  }, [setAlert]);

  useEffect(() => {
    RNBootSplash.hide({
      fade: true,
    });
  }, []);

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader
        backgroundColor="#f1f2f5"
        rightComponent={
          <MyView
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <MyTouch
              style={{
                padding: GS(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                nav.navigate("NoticeLayout");
              }}
            >
              <MyImage name="bell" />
            </MyTouch>
            <MyTouch
              style={{
                padding: GS(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                nav.navigate("SettingsLayout");
              }}
            >
              <MyImage name="user" />
            </MyTouch>
            <MyTouch
              style={{
                padding: GS(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                nav.navigate("DeviceSettingsLayout");
              }}
            >
              <MyImage name="settings" />
            </MyTouch>
            <MyView
              pointerEvents="none"
              style={{
                top: GS(15),
                right: GS(235),
                width: GS(40),
                height: GS(40),
                position: "relative",
                alignItems: "center",
                borderRadius: GS(20),
                justifyContent: "center",
                // backgroundColor: "#00A850",
              }}
            >
              <MyText
                font="nsb"
                style={{
                  fontSize: GS(20),
                  color: "#ffffff",
                }}
              >
                {/* 2 */}
              </MyText>
            </MyView>
          </MyView>
        }
      />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#f1f2f5",
        }}
      >
        <MyImage
          name="main_bg"
          style={{
            left: 0,
            position: "absolute",
            bottom: 0,
          }}
        />
        <MyScrollView
          style={{
            flex: 1,
          }}
          onInit={async () => {
            setLoading("init");
            await getNoticeList();
            setLoading(initialLoading);
          }}
          contentContainerStyle={{
            paddingTop: GS(20),
            paddingHorizontal: GS(82),
            paddingBottom: values.device.bottomSpaceHeight + GS(82),
          }}
        >
          <MyImage
            name="top_icon2"
            style={{
              width: GS(220),
              height: GS(220),
            }}
          />
          <MyText
            font="nsb"
            style={{
              height: GS(270),
              marginTop: GS(40),
              fontSize: GS(60),
              color: "#222222",
            }}
          >
            {appState.checkIdx !== -1 && appState.connectDevice ? (
              <>
                점검중인 장비{"\n"}'{appState.connectDevice.name}'
              </>
            ) : (
              `EB100과 함께${"\n"}엘리베이터 안전 관리를${"\n"}시작하세요!`
            )}
          </MyText>
          <MyTouch
            onPress={async () => {
              if (appState.checkIdx !== -1) {
                nav.navigate("CheckLayout");
              } else {
                const isSuccess = await checkPermission();
                if (isSuccess) {
                  setAction("check");
                  setIsDeviceListModalVisible(true);
                }
              }
            }}
            style={{
              marginTop: GS(120),
              height: GS(330),
              backgroundColor: values.colors.main,
              borderRadius: GS(20),
              paddingVertical: GS(70),
              paddingLeft: GS(70),
              paddingRight: GS(60),
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MyImage name="blackbox" />
            <MyText
              font="nsm"
              style={{
                fontSize: GS(55),
                color: "#ffffff",
                marginLeft: GS(70),
                marginBottom: GS(5),
              }}
            >
              점검하기
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
              marginTop: GS(30),
              flexDirection: "row",
            }}
          >
            <MyTouch
              onPress={async () => {
                if (appState.checkIdx !== -1) {
                  setToast({
                    msg: "점검중 상태에서는 부품교환이 불가능합니다.",
                  });
                } else {
                  const isSuccess = await checkPermission();
                  if (isSuccess) {
                    setAction("partChange");
                    setIsDeviceListModalVisible(true);
                  }
                }
              }}
              style={{
                flex: 1,
                height: GS(320),
                backgroundColor: appState.checkIdx !== -1 ? "#bbbbbb" : values.colors.sub2,
                borderRadius: GS(20),
                marginRight: GS(30),
              }}
            >
              <MyView
                style={{
                  padding: GS(40),
                }}
              >
                <MyImage
                  style={{
                    marginLeft: GS(30),
                  }}
                  name="component"
                />
                <MyView
                  style={{
                    marginTop: GS(50),
                    flexDirection: "row",
                  }}
                >
                  <MyText
                    font="nsm"
                    style={{
                      fontSize: GS(55),
                      color: "#ffffff",
                      marginLeft: GS(30),
                    }}
                  >
                    부품교환
                  </MyText>
                </MyView>
              </MyView>
            </MyTouch>
            <MyTouch
              onPress={async () => {
                if (appState.checkIdx !== -1) {
                  setToast({
                    msg: "점검중 상태에서는 고장처리가 불가능합니다.",
                  });
                } else {
                  const isSuccess = await checkPermission();
                  if (isSuccess) {
                    setAction("troubleshooting");
                    setIsDeviceListModalVisible(true);
                  }
                }
              }}
              style={{
                flex: 1,
                height: GS(320),
                backgroundColor: appState.checkIdx !== -1 ? "#bbbbbb" : values.colors.sub,
                borderRadius: GS(20),
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <MyView
                style={{
                  padding: GS(40),
                }}
              >
                <MyImage
                  style={{
                    marginLeft: GS(30),
                  }}
                  name="breakdown"
                />
                <MyView
                  style={{
                    marginTop: GS(50),
                    flexDirection: "row",
                  }}
                >
                  <MyText
                    font="nsm"
                    style={{
                      fontSize: GS(55),
                      color: "#ffffff",
                      marginLeft: GS(30),
                    }}
                  >
                    고장처리
                  </MyText>
                </MyView>
              </MyView>
            </MyTouch>
          </MyView>
          <>
            {!!noticeList.length && (
              <>
                <MyView
                  style={{
                    marginTop: GS(130),
                    flexDirection: "row",
                  }}
                >
                  <MyText
                    font="nsm"
                    style={{
                      fontSize: GS(55),
                      color: "#333333",
                    }}
                  >
                    알림
                  </MyText>
                  <MyView
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MyTouch
                      onPress={async () => {
                        if (!loading) {
                          setNoticeList([]);
                          setLoading("init");
                          await getNoticeList();
                          setLoading(initialLoading);
                        }
                      }}
                      style={{
                        padding: GS(20),
                        marginRight: GS(15),
                      }}
                    >
                      <MyIcon name="refresh-cw" />
                    </MyTouch>
                    <MyTouch
                      onPress={() => {
                        nav.navigate("NoticeLayout");
                      }}
                      style={{
                        padding: GS(10),
                        marginRight: GS(15),
                      }}
                    >
                      <MyIcon name="plus" size={GS(50)} />
                    </MyTouch>
                  </MyView>
                </MyView>
                {noticeList.map((notice) => {
                  return (
                    <MyView
                      key={notice.insDate}
                      style={{
                        height: GS(280),
                        marginTop: GS(30),
                        backgroundColor: "#ffffff",
                        borderRadius: GS(20),
                        paddingVertical: GS(50),
                        paddingLeft: GS(60),
                        paddingRight: GS(60),
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <MyView
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <MyImage name="alarm" />
                        <MyText
                          style={{
                            marginTop: GS(10),
                            fontSize: GS(30),
                          }}
                        >
                          {formats.date(notice.insDate, "ktt hh:MM")}
                        </MyText>
                      </MyView>
                      <MyView
                        style={{
                          marginLeft: GS(60),
                        }}
                      >
                        <MyText
                          style={{
                            color: "#333333",
                          }}
                        >
                          {notice.title}
                        </MyText>
                        <MyText
                          style={{
                            marginTop: GS(10),
                            fontSize: GS(35),
                          }}
                        >
                          {notice.content}
                        </MyText>
                      </MyView>
                    </MyView>
                  );
                })}
              </>
            )}
          </>
        </MyScrollView>
      </MyView>
      <HomeModal
        setIsImagePickerModalVisible={setIsImagePickerModalVisible}
        modalAction={modalAction}
        setModalAction={setModalAction}
        imageList={imageList}
        setImageList={setImageList}
      />
      <HomeDeviceListModal
        action={action}
        isDeviceListModalVisible={isDeviceListModalVisible}
        setIsDeviceListModalVisible={setIsDeviceListModalVisible}
        setModalAction={setModalAction}
      />
      <HomeImageSelectModal
        isVisible={isImagePickerModalVisible}
        setIsVisible={setIsImagePickerModalVisible}
        imageList={imageList}
        setImageList={setImageList}
      />
    </MyLayout>
  );
}

export default HomeLayout;
