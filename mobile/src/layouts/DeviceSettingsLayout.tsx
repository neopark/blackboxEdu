import React, { useCallback, useState } from "react";
import MyView from "../myComponents/MyView";
import MyStatusBar from "../myComponents/MyStatusBar";
import values from "../values";
import { GS } from "../styles/sizes";
import MyHeader from "../myTemplates/MyHeader";
import MyText from "../myComponents/MyText";
import MyScrollView from "../myComponents/MyScrollView";
import MyTouch from "../myComponents/MyTouch";
import { useToast } from "../contexts/toast";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { initialLoading, useLoading } from "../contexts/loading";
import MyLayout from "../myTemplates/MyLayout";

type T_device = {
  id: string;
  name: string;
};

function DeviceSettingsLayout() {
  const { loading, setLoading } = useLoading();
  const { setToast } = useToast();
  const [deviceList, setDeviceList] = useState<T_device[] | null>(null);

  const loadDeviceList = useCallback(async () => {
    try {
      const tempDeviceList: T_device[] = await BluetoothSerial.list();
      const newDeviceList: T_device[] = [];
      for (let idx = 0; idx < tempDeviceList.length; idx++) {
        const device = tempDeviceList[idx];
        if (device.name) {
          newDeviceList.push(device);
        }
      }
      setDeviceList(newDeviceList);
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
  }, [setToast]);

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyScrollView
        style={{
          flex: 1,
        }}
        onInit={async () => {
          setLoading("onInit");
          await loadDeviceList();
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          if (!loading) {
            setDeviceList(null);
            await loadDeviceList();
          }
        }}
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
      >
        <MyView
          style={{
            height: GS(430),
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
            ????????????
          </MyText>
        </MyView>
        <MyView
          style={{
            backgroundColor: "#ffffff",
            paddingTop: GS(30),
            paddingHorizontal: GS(82),
            paddingBottom: GS(82) + values.device.bottomSpaceHeight,
          }}
        >
          <MyText
            style={{
              marginTop: GS(60),
              fontSize: GS(35),
              color: "#888888",
            }}
          >
            ???????????? ?????? ?????????
          </MyText>
          {deviceList && (
            <>
              {deviceList.length ? (
                <>
                  {deviceList.map((device, idx) => {
                    return (
                      <MyView key={idx}>
                        <MyTouch
                          onPress={() => {
                            //
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
                            {device.name}
                          </MyText>
                        </MyTouch>
                        <MyView
                          style={{
                            height: GS(2),
                            backgroundColor: "#dddddd",
                          }}
                        />
                      </MyView>
                    );
                  })}
                  <MyText
                    style={{
                      color: "#888888",
                      fontSize: GS(35),
                      marginTop: GS(200),
                    }}
                  >
                    * ????????? ????????? ??? ?????? ????????? ????????????, ????????? ?????? ?????? ?????? ??????, ?????? ?????????
                    ???????????? ????????? ????????? ?????????.
                  </MyText>
                </>
              ) : (
                <MyText
                  style={{
                    color: "#888888",
                    fontSize: GS(40),
                    marginTop: GS(200),
                  }}
                >
                  * ????????? ????????? ??? ?????? ????????? ????????? {"\n"}Bluetooth??? ????????? ????????? ??? ????????????.
                  {"\n"}Bluetooth ????????? ????????? ?????????.{"\n\n"}* ????????? ????????? ??? ?????? ?????????
                  ????????????, ????????? ?????? ?????? ?????? ??????, ?????? ????????? ???????????? ????????? ????????? ?????????.
                </MyText>
              )}
            </>
          )}
        </MyView>
      </MyScrollView>
    </MyLayout>
  );
}

export default DeviceSettingsLayout;
