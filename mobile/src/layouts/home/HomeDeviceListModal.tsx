import React, { useCallback, useEffect, useState } from "react";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import apis from "../../apis";
import { T_device, useAppState } from "../../contexts/appState";
import { initialLoading, useLoading } from "../../contexts/loading";
import { useToast } from "../../contexts/toast";
import { useUser } from "../../contexts/user";
import MyIcon from "../../myComponents/MyIcon";
import MyImage from "../../myComponents/MyImage";
import MyScrollView from "../../myComponents/MyScrollView";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyView from "../../myComponents/MyView";
// import MyScrollView from "../../myComponents/MyScrollView";
import MyModal from "../../myTemplates/MyModal";
import { GS } from "../../styles/sizes";
import useNav from "../../uses/useNav";
import values from "../../values";
import { T_action } from "../HomeLayout";

type T_HomeDeviceListModalProps = {
  action: T_action;
  isDeviceListModalVisible: boolean;
  setIsDeviceListModalVisible: (isDeviceListModalVisible: boolean) => void;
  setModalAction: (modalAction: T_action) => void;
};

function HomeDeviceListModal({
  action,
  isDeviceListModalVisible,
  setIsDeviceListModalVisible,
  setModalAction,
}: T_HomeDeviceListModalProps) {
  const nav = useNav();
  const { appState, setAppState } = useAppState();
  const { loading, setLoading } = useLoading();
  const { setToast } = useToast();
  const [deviceList, setDeviceList] = useState<T_device[] | null>(null);
  const { user } = useUser();

  const loadDeviceList = useCallback(async () => {
    try {
      const tempDeviceList: T_device[] = await BluetoothSerial.list();
      const newDeviceList: T_device[] = [];
      for (let idx = 0; idx < tempDeviceList.length; idx++) {
        const device = tempDeviceList[idx];
//        console.log(device.class == undefined ?"":device.class)
//        const temp :  BluetoothSerial.AndroidBluetoothDevice & BluetoothSerial.iOSBluetoothDevice = device;
        if (device.name) {
     //     if((device.class == undefined ?"272":device.class)=="272"){
            newDeviceList.push(device);
       //   }
        }
      }
      setDeviceList(newDeviceList);
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
  }, [setToast]);

  const connect = useCallback(async (device: T_device) => {
    let newConnectDevice = await new Promise(async (resolve: (device: T_device | null) => void) => {
      try {
        setTimeout(async () => {
          resolve(null);
        }, 7000);
        const newDevice = await BluetoothSerial.connect(device.id);
        resolve(newDevice);
      } catch {
        resolve(null);
      }
    });
    return newConnectDevice;
  }, []);

  const checkDevice = useCallback(async (device: T_device) => {
    let isSuccess = false;
    const sendMsg = "G";
    const delimiter: any = "G;";
    isSuccess = await new Promise(async (resolve: (isSuccess: boolean) => void) => {
      try {
        // BluetoothSerial.device(device.id).read(
        //   (async (data: string, subscription: EmitterSubscription) => {
        //     BluetoothSerial.removeSubscription(subscription);
        //     const msg = data.trim().replace(delimiter, "");
        //     if (msg !== "BPNS2G,bp0620!!") {
        //       resolve(false);
        //     } else {
        //       const newIsSuccess = await BluetoothSerial.device(device.id).write("C1");
        //       resolve(newIsSuccess);
        //     }
        //   }) as any,
        //   delimiter
        // );
        // const newIsSuccess = await BluetoothSerial.device(device.id).write(sendMsg);
        // if (!newIsSuccess) {
        //   resolve(false);
        // }
        //
        resolve(true);
        //
        setTimeout(() => {
          resolve(false);
        }, 5000);
      } catch {
        resolve(false);
      }
    });
    return isSuccess;
  }, []);

  const startCheck = useCallback(async (device : T_device) => {
    let checkIdx = -1;
    try {
      const result = await apis.check.start({
        elevatorNo: device?.name, //"0055015",
        insUserId: user.id,
      });
      if (result.isSuccess) {
        checkIdx = result.idx;
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
    return checkIdx;
  }, [setToast, user.id]);

  const check = useCallback(
    async (device: T_device) => {
      const isConnect = await BluetoothSerial.isConnected(device.id);
      let newConnectDevice = null;
      if (isConnect) {
        newConnectDevice = device;
      } else {
        newConnectDevice  = await connect(device);
      }
      if (!newConnectDevice) {
        setToast({
          msg: "장비와 연결에 실패했습니다.",
        });
      } else {
        const isSuccess = await checkDevice(newConnectDevice);
        if (!isSuccess) {
          setToast({
            msg: "장비와 연결에 실패했습니다.",
          });
          BluetoothSerial.disconnect(device.id);
        } else {
          if (action === "check") {

            setAppState({
              ...appState,
              connectDevice: newConnectDevice,
            });

            console.log(newConnectDevice);

            const checkIdx = await startCheck(newConnectDevice);
            // if (checkIdx === -1) {
            //   setToast({
            //     msg: "장비와 연결에 실패했습니다.",
            //   });
            //   BluetoothSerial.disconnect(device.id);
            // } else {
              setAppState({
                ...appState,
                checkIdx,
                connectDevice: newConnectDevice,
              });
  
            setIsDeviceListModalVisible(false);
            nav.navigate("CheckLayout");
            setToast({
              msg: "점검을 시작합니다.",
            });
            // }
          } else {
            setAppState({
              ...appState,
              connectDevice: newConnectDevice,
            });
            setIsDeviceListModalVisible(false);
            setModalAction(action);
          }
        }
      }
    },
    [
      connect,
      setToast,
      checkDevice,
      action,
      startCheck,
      setAppState,
      appState,
      setIsDeviceListModalVisible,
      nav,
      setModalAction,
    ]
  );

  useEffect(() => {
    if (isDeviceListModalVisible) {
      const timeout = setTimeout(async () => {
        setLoading("onInit");
        await loadDeviceList();
        setLoading(initialLoading);
      }, 200);
      return () => {
        clearTimeout(timeout);
        setDeviceList(null);
      };
    }
  }, [isDeviceListModalVisible, loadDeviceList, setIsDeviceListModalVisible, setLoading, setToast]);

  return (
    <MyModal
      isVisible={isDeviceListModalVisible}
      setIsVisible={setIsDeviceListModalVisible}
      style={{
        backgroundColor: "#f1f2f5",
        width: values.device.width - GS(82 * 2),
        height: values.device.height - GS(82 * 4),
        borderRadius: GS(30),
        position: "relative",
      }}
    >
      <MyView
        style={{
          flex: 1,
          paddingTop: GS(150),
          paddingHorizontal: GS(60),
          paddingBottom: GS(50),
        }}
      >
        <MyView
          style={{
            paddingHorizontal: GS(40),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MyText
            font="nsb"
            style={{
              fontSize: GS(60),
              color: values.colors.main,
            }}
          >
            연결 가능 장비
          </MyText>
          <MyTouch
            onPress={async () => {
              if (!loading) {
                setLoading("refresh");
                setDeviceList(null);
                await loadDeviceList();
                setLoading(initialLoading);
              }
            }}
            style={{
              padding: GS(15),
              marginLeft: GS(15),
            }}
          >
            <MyIcon size={GS(50)} name="refresh-cw" />
          </MyTouch>
        </MyView>

        <MyView
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: GS(30),
            marginTop: GS(40),
          }}
        >
          <MyScrollView
            style={{
              paddingTop: GS(30),
              paddingBottom: GS(30),
            }}
          >
            {deviceList && (
              <>
                {deviceList.length ? (
                  <>
                    {deviceList.map((device) => {
                      return (
                        <MyView
                          key={device.id}
                          style={{
                            paddingHorizontal: GS(60),
                          }}
                        >
                          <MyTouch
                            onPress={async () => {
                              if (!loading) {
                                setLoading("refresh");
                                await check(device);
                                setLoading(initialLoading);
                              }
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
                        paddingHorizontal: GS(40),
                        fontSize: GS(35),
                        marginTop: GS(40),
                      }}
                    >
                      * 주변에 연결할 수 있는 장비가 있음에도, 장비가 스캔 되지 않을 경우, 직접
                      장비와 블루투스 연결을 진행해 주세요.
                    </MyText>
                  </>
                ) : (
                  <MyText
                    style={{
                      color: "#888888",
                      paddingHorizontal: GS(40),
                      fontSize: GS(40),
                    }}
                  >
                    * 주변에 연결할 수 있는 장비가 없거나 {"\n"}Bluetooth가 비활성 상태일 수
                    있습니다.{"\n"}Bluetooth 상태를 확인해 주세요.{"\n\n"}* 주변에 연결할 수 있는
                    장비가 있음에도, 장비가 스캔 되지 않을 경우, 직접 장비와 블루투스 연결을 진행해
                    주세요.
                  </MyText>
                )}
              </>
            )}
          </MyScrollView>
        </MyView>
      </MyView>
      <MyTouch
        onPress={() => {
          setIsDeviceListModalVisible(false);
        }}
        style={{
          position: "absolute",
          top: GS(30),
          right: GS(60),
          padding: GS(20),
        }}
      >
        <MyImage name="closed" />
      </MyTouch>
    </MyModal>
  );
}

export default HomeDeviceListModal;
