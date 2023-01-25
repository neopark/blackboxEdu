import React, { useCallback } from "react";
import MyView from "../../myComponents/MyView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyImage from "../../myComponents/MyImage";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyHeader from "../../myTemplates/MyHeader";
import MyScrollView from "../../myComponents/MyScrollView";
import useNav from "../../uses/useNav";
import { GS } from "../../styles/sizes";
import apis from "../../apis";
import { useToast } from "../../contexts/toast";
import { initialLoading, useLoading } from "../../contexts/loading";
import {
  initialCheckStateList,
  T_checkDetailState,
  T_checkDetailType,
  T_checkState,
  useCheckStateList,
} from "../../contexts/checkStateList";
import { T_device, useAppState } from "../../contexts/appState";
import { T_checkCompleteDataDetail, T_checkCompleteDataResult } from "../../apis/check";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import MyLayout from "../../myTemplates/MyLayout";
import WifiManager from "react-native-wifi-reborn";
import RNFS from "react-native-fs";
import { useAlert } from "../../contexts/alert";
import axios from "axios";

function IndexLayout() {
  const nav = useNav();
  const { appState, setAppState } = useAppState();
  const { loading, setLoading } = useLoading();
  const { setAlert } = useAlert();
  const { setToast } = useToast();
  const { checkStateList, setCheckStateList } = useCheckStateList();
  const isAllTypeAList: boolean[] = [];
  for (let idx = 0; idx < checkStateList.length; idx++) {
    const checkState = checkStateList[idx];
    let isAllTypeA = true;
    if (checkState.detailList) {
      for (let jdx = 0; jdx < checkState.detailList.length; jdx++) {
        const checkDetailState = checkState.detailList[jdx];
        if (checkDetailState.type) {
          isAllTypeA = false;
          break;
        }
      }
    }
    isAllTypeAList.push(isAllTypeA);
  }

  const getItem = useCallback((type: T_checkDetailType, detailList: T_checkDetailState[]) => {
    let typeName = "";
    if (type === "except") {
      typeName = "제외";
    } else {
      typeName = `${type.toUpperCase()} 선택`;
    }

    return (
      <MyView
        style={{
          paddingHorizontal: GS(50),
          paddingTop: GS(50),
        }}
      >
        <MyText
          font="nsm"
          style={{
            color: "#222222",
          }}
        >
          {typeName}
        </MyText>
        {detailList.map((detail) => {
          let text = "";
          if (detail.codeName) {
            text += `${detail.codeName} - `;
          }
          text += detail.codeContent;

          return (
            <MyText
              font="nsl"
              style={{
                color: "#666666",
                fontSize: GS(40),
              }}
              key={detail.idx}
            >
              {" "}
              •{"  "}
              {text}
            </MyText>
          );
        })}
      </MyView>
    );
  }, []);

  const endCheck = useCallback(async () => {
    try {
      await apis.check.end({
        idx: appState.checkIdx,
      });
      // const tmpchekstate : T_checkState[] = [];
      // setCheckStateList(tmpchekstate);
      setCheckStateList(initialCheckStateList);
      setAppState({
        checkIdx: -1,
        connectDevice: null,
      });
      nav.goBack();
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
  }, [appState, nav, setAppState, setToast]);

  const getCheckList = useCallback(async () => {
    try {
      const result = await apis.check.get();
      if (result.isSuccess) {
        const newCheckStateList: T_checkState[] = [];
        for (let idx = 0; idx < result.checkList.length; idx++) {
          const check = result.checkList[idx];
          newCheckStateList.push({
            ...check,
            isFold: false,
            detailList: null,
          });
        }
        setCheckStateList(newCheckStateList);
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
  }, [setCheckStateList, setToast]);

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
    const sendMsg = "E ";
    // const sendMsg = "W ";
    isSuccess = await new Promise(async (resolve: (isSuccess: boolean) => void) => {
      try {
        setTimeout(() => {
          resolve(false);
        }, 1000);
        // }, 10000);
        const newIsSuccess = await BluetoothSerial.device(device.id).write(sendMsg);
        resolve(newIsSuccess);
      } catch {
        resolve(false);
      }
    });
    return isSuccess;
  }, []);

  const completeCheck = useCallback(async () => {
    let isSuccess = false;
    try {
      const detail: T_checkCompleteDataDetail[] = [];
      for (let idx = 0; idx < checkStateList.length; idx++) {
        const checKState = checkStateList[idx];
        if (checKState.detailList) {
          for (let jdx = 0; jdx < checKState.detailList.length; jdx++) {
            const checkDetailState = checKState.detailList[jdx];
            if (checkDetailState.type) {
              let typeName: T_checkCompleteDataResult = "B";
              switch (checkDetailState.type) {
                case "b": {
                  typeName = "B";
                  break;
                }
                case "c": {
                  typeName = "C";
                  break;
                }
                case "except": {
                  typeName = "제외";
                  break;
                }
              }
              detail.push({
                masterIdx: String(appState.checkIdx),
                result: typeName,
                checkIdx: checkDetailState.idx,
              });
            }
          }
        }
      }
      const result = await apis.check.complete({
        detail,
        idx: appState.checkIdx,
        status: "0",
      });
      if (!result.isSuccess) {
        setToast({
          msg: result.msg,
        });

        setAlert({
          msg: result.msg,
          buttonList: [
            {
              text: "확인",
            },
          ],
        });        

      } else {
        setCheckStateList(initialCheckStateList);
        setAppState({
          checkIdx: -1,
          connectDevice: null,
        });
        setToast({
          msg: "점검이 완료되었습니다.",
        });
        nav.goBack();
      }
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
    return isSuccess;
  }, [appState, checkStateList, nav, setAppState, setCheckStateList, setToast]);

  const complete = useCallback(async () => {
    const ip = "http://192.168.4.1";
    // const ssid = "ELEV AP";
    const ssid = appState.connectDevice?.name; //"0777211";
    // const ssid = "ESP32";
    // const fileName = "20220513.txt";
    // const fileName = `F${formats.date(new Date(), "mmdd")}.txt`;
    const fileName = `F0815.txt`;
    if (appState.connectDevice && appState.checkIdx !== -1) {
      const isConnect = await BluetoothSerial.isConnected(appState.connectDevice.id);
      let connectDevice = null;
      if (isConnect) {
        connectDevice = appState.connectDevice;
      } else {
        setToast({
          msg: "블루투스 연결 요청",
        });
        connectDevice = await connect(appState.connectDevice);
      }
      if (!connectDevice) {
        setToast({
          msg: "장비와 연결에 실패했습니다.",
        });
      } else {
        setToast({
          msg: "블루투스 연결 완료",
        });
        const isSuccess = await checkDevice(connectDevice);
        if (!isSuccess) {
          setToast({
            msg: "장비와 연결에 실패했습니다.",
          });
        } else {
          setToast({
            msg: "와이파이 모드 진입중",
          });
          await new Promise((resolve: (isNext: boolean) => void) => {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          });
          let curSsid = "";
          try {
            curSsid = await WifiManager.getCurrentWifiSSID();
          } catch {
            //
          }
          setToast({
            msg: curSsid,
          });
          await new Promise((resolve: (isNext: boolean) => void) => {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          });
//          if (curSsid !== ssid) {
            await WifiManager.disconnect(); // 무조검 연결끊기
            
            // await new Promise((resolve: (isNext: boolean) => void) => {
            //   setTimeout(() => {
            //     resolve(true);
            //   }, 1000);
            // });            
            setToast({
              msg: "와이파이 모드 연결 요청:"+ssid,
            });
            try {
              await WifiManager.connectToProtectedSSID(ssid, "", false);
            } catch (err) {
              console.log(err);
            }
  //        }

          // 와이파이 AP 접속모드로 변경하기
          try {
            await WifiManager.forceWifiUsageWithOptions(true, {
              noInternet: true,
            });
          } catch (err) {
            console.log("err");
            console.log(err);
          }

          setToast({
            msg: "와이파이 옵션 변경 끝",
          });
          await new Promise((resolve: (isNext: boolean) => void) => {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          });
          setToast({
            msg: "파일 다운로드 요청",
          });
          const newData: any[] = [];
          try {
            const result = await axios({
              url: `${ip}/T`,
              method: "get",
            });
            let month: number | string = new Date().getMonth() + 1;
            if (String(month).length === 1) {
              month = "0" + String(month);
            }
            if (result.data) {
              for (let i = 0; i < result.data.length; i++) {
                if (
                  String(result.data[i].name).includes(".txt") &&
                  result.data[i].name[1] === String(month)[0] &&
                  result.data[i].name[2] === String(month)[1]
                ) {
                  newData.push(result.data[i].name);
                  try {
                    await RNFS.downloadFile({
                      fromUrl: `${ip}/DB/${result.data[i].name}`,
                      toFile: `${RNFS.TemporaryDirectoryPath}/${result.data[i].name}`,
                    }).promise;
                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            }
          } catch (err) {
            console.log(err);
          }

          // try {
          //   await RNFS.downloadFile({
          //     fromUrl: `${ip}/DB/F0814.txt`,
          //     toFile: `${RNFS.TemporaryDirectoryPath}/F0814.txt`,
          //   }).promise;
          // } catch (err) {
          //   console.log(err);
          // }
          // try {
          //   await RNFS.downloadFile({
          //     fromUrl: `${ip}/DB/F0816.txt`,
          //     toFile: `${RNFS.TemporaryDirectoryPath}/F0816.txt`,
          //   }).promise;
          // } catch (err) {
          //   console.log(err);
          // }

          // 다운로드 완료후 AP접속모드 해제(false,false해야 처리 가능 박광희)
          try {
            await WifiManager.forceWifiUsageWithOptions(false, {
              noInternet: false,
            });
          } catch (err) {
            console.log("err");
            console.log(err);
          }

          try {
            setToast({
              msg: "AP접속모드 해제",
            });
            // await new Promise((resolve: (isNext: boolean) => void) => {
            //   setTimeout(() => {
            //     resolve(true);
            //   }, 3000);
            // });
            await WifiManager.setEnabled(false);
            // await new Promise((resolve: (isNext: boolean) => void) => {
            //   setTimeout(() => {
            //     resolve(true);
            //   }, 3000);
            // });
          } catch (err) {
            console.log(err);
          }
          setToast({
            msg: "다운로드 받은 파일 여부 검사 요청",
          });
          console.log(newData);
          const fileList = await RNFS.readDir(RNFS.TemporaryDirectoryPath);
          const uploadFileList: any[] = [];
          for (let idx = 0; idx < fileList.length; idx++) {
            const file = fileList[idx];
            for (let jdx = 0; jdx < newData.length; jdx++) {
              // newData
              console.log(file.name, newData[jdx]);
              if (file.isFile() && file.name === newData[jdx]) {
                uploadFileList.push(file);
                break;
              }
            }
            // const file = fileList[idx];
            // // newData
            // if (file.isFile() && file.name === fileName) {
            //   uploadFileList.push()
            //   await new Promise((resolve: (isNext: boolean) => void) => {
            //     setTimeout(() => {
            //       resolve(true);
            //     }, 10000);
            //   });

            // } else
          }

          if (uploadFileList.length === 0) {
            setToast({
              msg: "서버 파일 업로드 실패: 파일 다운로드가 제대로 이루어지지 않음",
            });
          } else {
            try {
              setToast({
                msg: "서버 파일 업로드 요청",
              });
              const uploadResult = await apis.check.uploadFile({
                elevatorNo: appState.connectDevice.name,
                files: uploadFileList.map((newFile) => {
                  return {
                    uri: "file://" + newFile.path,
                    name: newFile.name,
                    type: "text/txt",
                  };
                }),
              });
              if (uploadResult.isSuccess) {
                await completeCheck();
              } else {
                setToast({
                  msg: "서버 파일 업로드 실패",
                });
              }
            } catch (err) {
              console.log("err");
              console.log(err);
              setToast({
                msg: "서버 파일 업로드 실패",
              });
            }
          }

     
        }
      }
    }
  }, [appState, checkDevice, completeCheck, connect, setToast]);

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader
        backgroundColor="#f1f2f5"
        leftComponentName="back"
        rightComponent={
          <>
            <MyView style={{ alignItems: "flex-end" }}>
              <MyTouch
                onPress={() => {
                  setAlert({
                    msg: "정말로 엘리베이터 점검을 취소하시겠습니까?",
                    buttonList: [
                      {
                        text: "취소",
                      },
                      {
                        text: "확인",
                        color: values.colors.red,
                        onPress: () => {
                          endCheck();
                        },
                      },
                    ],
                  });
                }}
                style={{
                  height: GS(140),
                  borderRadius: GS(20),
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: GS(50),
                }}
              >
                <MyText
                  font="nsb"
                  style={{
                    fontSize: GS(40),
                    color: values.colors.red,
                  }}
                >
                  취소
                </MyText>
              </MyTouch>
            </MyView>
          </>
        }
      />
      <MyScrollView
        style={{
          flex: 1,
          backgroundColor: "#f1f2f5",
        }}
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingHorizontal: GS(82),
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
        onInit={async () => {
          if (checkStateList === initialCheckStateList) {
            setLoading("init");
            await getCheckList();
            setLoading(initialLoading);
          }
        }}
      >
        <MyView
          style={{
            marginTop: GS(10),
            position: "relative",
          }}
        >
          <MyText
            font="nsb"
            style={{
              fontSize: GS(80),
              color: values.colors.main,
            }}
          >
            엘리베이터{"\n"}1차 체크 리스트
          </MyText>
          <MyImage
            style={{
              top: GS(145),
              left: GS(545),
              position: "absolute",
            }}
            name="interrogation"
          />
        </MyView>
        <MyView
          style={{
            flexDirection: "row",
            marginTop: GS(30),
            flexWrap: "wrap",
          }}
        >
          {console.log(checkStateList)}
          {checkStateList.map((checkState, idx) => {
            let isComplete = !!checkState.detailList;

            return (
              <MyTouch
                key={idx}
                onPress={() => {
                  nav.navigate("DetailLayout", {
                    checkState,
                    setCheckState: (newCheckState: T_checkState) => {
                      const newCheckStateList = [...checkStateList];
                      newCheckStateList[idx] = newCheckState;
                      setCheckStateList(newCheckStateList);
                    },
                  });
                }}
                style={{
                  backgroundColor: isComplete ? values.colors.main : "#ffffff",
                  width: GS(285),
                  height: GS(360),
                  borderRadius: GS(20),
                  paddingLeft: GS(30),
                  paddingRight: GS(10),
                  paddingVertical: GS(30),
                  marginRight: GS(20),
                  marginBottom: GS(20),
                }}
              >
                <MyImage name="checklist" />
                <MyView
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  <MyText
                    font={isComplete ? "nsm" : undefined}
                    style={{
                      width: GS(210),
                      color: isComplete ? "#ffffff" : "#333333",
                    }}
                  >
                    {checkState.codeContent}
                  </MyText>
                  <MyImage
                    style={{
                      right: GS(0),
                      bottom: GS(12),
                      position: "absolute",
                    }}
                    name="detailview_white"
                  />
                </MyView>
              </MyTouch>
            );
          })}
        </MyView>
        {(() => {
          const notATypeCheckStateList = [];
          for (let idx = 0; idx < checkStateList.length; idx++) {
            const checkState = checkStateList[idx];
            const isAllTypeA = isAllTypeAList[idx];
            if (!isAllTypeA) {
              notATypeCheckStateList.push(checkState);
            }
          }

          if (notATypeCheckStateList.length !== 0) {
            return (
              <>
                <MyText
                  font="nsb"
                  style={{
                    fontSize: GS(80),
                    marginTop: GS(50),
                    color: values.colors.sub,
                  }}
                >
                  엘리베이터{"\n"}
                  변경완료 항목
                </MyText>
                <MyView
                  style={{
                    borderRadius: GS(20),
                    marginTop: GS(30),
                  }}
                >
                  {notATypeCheckStateList.map((notATypeCheckState) => {
                    return (
                      <MyView
                        key={notATypeCheckState.idx}
                        style={{
                          marginBottom: GS(20),
                        }}
                      >
                        <MyTouch
                          onPress={() => {
                            const newCheckStateList = [...checkStateList];
                            for (let idx = 0; idx < newCheckStateList.length; idx++) {
                              const checkState = newCheckStateList[idx];
                              if (checkState.idx === notATypeCheckState.idx) {
                                newCheckStateList[idx].isFold = !checkState.isFold;
                                break;
                              }
                            }
                            setCheckStateList(newCheckStateList);
                          }}
                          style={{
                            backgroundColor: values.colors.sub,
                            paddingHorizontal: GS(50),
                            height: GS(140),
                            borderRadius: GS(20),
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <MyText
                            font="nsm"
                            style={{
                              color: "#ffffff",
                            }}
                          >
                            {notATypeCheckState.codeContent}
                          </MyText>
                          <MyView
                            style={{
                              flex: 1,
                              alignItems: "flex-end",
                            }}
                          >
                            <MyImage
                              name="detailview_white"
                              style={{
                                transform: [
                                  {
                                    rotate: notATypeCheckState.isFold ? "0deg" : "90deg",
                                  },
                                ],
                              }}
                            />
                          </MyView>
                        </MyTouch>
                        {!notATypeCheckState.isFold && notATypeCheckState.detailList && (
                          <>
                            {(() => {
                              const checkDetailList = notATypeCheckState.detailList;
                              const bList: T_checkDetailState[] = [];
                              const cList: T_checkDetailState[] = [];
                              const exceptList: T_checkDetailState[] = [];
                              for (let idx = 0; idx < checkDetailList.length; idx++) {
                                const checkDetail = checkDetailList[idx];
                                if (checkDetail.type === "b") {
                                  bList.push(checkDetail);
                                } else if (checkDetail.type === "c") {
                                  cList.push(checkDetail);
                                } else if (checkDetail.type === "except") {
                                  exceptList.push(checkDetail);
                                }
                              }

                              return (
                                <MyView
                                  style={{
                                    paddingBottom: GS(50),
                                    backgroundColor: "#ffffff",
                                    borderBottomLeftRadius: GS(20),
                                    borderBottomRightRadius: GS(20),
                                    marginBottom: GS(40),
                                  }}
                                >
                                  {bList.length !== 0 && getItem("b", bList)}
                                  {cList.length !== 0 && getItem("c", cList)}
                                  {exceptList.length !== 0 && getItem("except", exceptList)}
                                </MyView>
                              );
                            })()}
                          </>
                        )}
                      </MyView>
                    );
                  })}
                </MyView>
              </>
            );
          }
        })()}
        {!!checkStateList.length && (
          <>
            {(() => {
              let isAllComplete = true;
              for (let idx = 0; idx < checkStateList.length; idx++) {
                const checkState = checkStateList[idx];
                if (!checkState.detailList) {
                  isAllComplete = false;
                  break;
                }
              }

              return (
                <MyTouch
                  onPress={async () => {
                    if (!loading) {
                      if (isAllComplete) {
                        setLoading("complete");
                        await complete();
                        setLoading(initialLoading);
                      } else {
                        setToast({
                          msg: "모든 체크 항목들을 확인해 주세요.",
                        });
                      }
                    }
                  }}
                  style={{
                    height: GS(160),
                    backgroundColor: isAllComplete ? values.colors.main : "#888888",
                    borderRadius: GS(20),
                    marginTop: GS(200),
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
                    완료
                  </MyText>
                </MyTouch>
              );
            })()}
          </>
        )}
      </MyScrollView>
    </MyLayout>
  );
}

export default IndexLayout;
