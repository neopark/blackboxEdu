import React, { useCallback, useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyText from "../myComponents/MyText";
import MyView from "../myComponents/MyView";
import useNav from "../uses/useNav";
import { GS } from "../styles/sizes";
import values from "../values";
import { useToast } from "../contexts/toast";
import { useAlert } from "../contexts/alert";
import permission from "../modules/permission";
import MyLayout from "../myTemplates/MyLayout";

function ExampleScanLayout() {
  const { setToast } = useToast();
  const { setAlert } = useAlert();
  const nav = useNav();
  const [isInit, setIsInit] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const height = values.device.height - values.device.statusBarHeight - values.device.headerHeight;

  const getItem = useCallback(
    (item: { isHorizontal: boolean; isLeft: boolean; isTop: boolean }) => {
      return (
        <MyView
          style={{
            left: item.isLeft ? 0 : undefined,
            right: !item.isLeft ? 0 : undefined,
            top: item.isTop ? 0 : undefined,
            bottom: !item.isTop ? 0 : undefined,
            width: item.isHorizontal ? GS(30) : GS(5),
            height: item.isHorizontal ? GS(5) : GS(30),
            position: "absolute",
            borderRadius: GS(2.5),
            backgroundColor: "#ffffff",
          }}
        />
      );
    },
    []
  );

  useEffect(() => {
    if (!isInit) {
      const init = async () => {
        setIsInit(true);
        const msg = await permission.requestCamera();
        if (msg !== "success") {
          if (msg.includes("권한을 변경하시겠습니까?")) {
            setAlert({
              msg,
              onHide: nav.goBack,
              buttonList: [
                {
                  text: "취소",
                },
                {
                  text: "확인",
                  color: values.colors.blue,
                  onPress: () => {
                    nav.goBack();
                    permission.openSettings();
                  },
                },
              ],
            });
          } else {
            setAlert({
              onHide: nav.goBack,
              msg,
            });
          }
        } else {
          setIsAvailable(true);
        }
      };
      init();
    }
  }, [isInit, nav, setAlert, setToast]);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader title="Scan" leftComponentName="back" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#000000",
        }}
      >
        {isAvailable && (
          <QRCodeScanner
            onRead={(evt) => {
              setToast({
                msg: evt.data,
              });
            }}
            cameraStyle={{
              height,
              width: values.device.width,
              top: GS(0),
              position: "absolute",
            }}
            containerStyle={{
              height,
              width: values.device.width,
              top: GS(0),
              position: "absolute",
              backgroundColor: "#000000",
            }}
            reactivateTimeout={2000}
            reactivate={true}
          />
        )}
        <MyView
          style={{
            height,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isAvailable ? undefined : "#000000",
          }}
        >
          <MyView
            style={{
              width: values.device.width / 1.8,
              height: values.device.width / 1.8,
              position: "relative",
              justifyContent: "center",
            }}
          >
            {getItem({
              isTop: true,
              isLeft: true,
              isHorizontal: true,
            })}
            {getItem({
              isTop: true,
              isLeft: false,
              isHorizontal: true,
            })}
            {getItem({
              isTop: false,
              isLeft: true,
              isHorizontal: true,
            })}
            {getItem({
              isTop: false,
              isLeft: false,
              isHorizontal: true,
            })}
            {getItem({
              isTop: true,
              isLeft: true,
              isHorizontal: false,
            })}
            {getItem({
              isTop: true,
              isLeft: false,
              isHorizontal: false,
            })}
            {getItem({
              isTop: false,
              isLeft: true,
              isHorizontal: false,
            })}
            {getItem({
              isTop: false,
              isLeft: false,
              isHorizontal: false,
            })}
            <MyView
              style={{
                width: values.device.width / 1.8,
                height: GS(5),
                borderRadius: GS(2.5),
                backgroundColor: values.colors.red,
              }}
            />
          </MyView>
          <MyText
            font="nsm"
            style={{
              marginTop: GS(20),
              fontSize: GS(20),
              color: "#ffffff",
            }}
          >
            Scan
          </MyText>
        </MyView>
      </MyView>
    </MyLayout>
  );
}

export default ExampleScanLayout;
