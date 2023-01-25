import React, { useCallback, useState } from "react";
import apis from "../../apis";
import { T_checkGetDetail } from "../../apis/check";
import { initialLoading, useLoading } from "../../contexts/loading";
import formats from "../../modules/formats";
import MyScrollView from "../../myComponents/MyScrollView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import MyText from "../../myComponents/MyText";
import MyView from "../../myComponents/MyView";
import MyHeader from "../../myTemplates/MyHeader";
import MyLayout from "../../myTemplates/MyLayout";
import { GS } from "../../styles/sizes";
import useNavParams from "../../uses/useNavParams";
import values from "../../values";

function CheckDetailLayout() {
  const { loading, setLoading } = useLoading();
  const params = useNavParams();
  const [checkDetailList, setCheckDetailList] = useState<T_checkGetDetail[] | null>(null);

  const getCheckDetailList = useCallback(async () => {
    try {
      const result = await apis.check.getDetailList({
        masterIdx: params.idx,
      });
      if (result.isSuccess) {
        setCheckDetailList(result.checkDetailList);
      } else {
        setCheckDetailList([]);
      }
    } catch (err: any) {
      setCheckDetailList([]);
      console.log(err.message);
    }
  }, [params.idx]);

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
          await getCheckDetailList();
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          console.log(loading);
          if (!loading) {
            setCheckDetailList(null);
            await getCheckDetailList();
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
            점검 결과
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
            font="nsb"
            style={{
              marginTop: GS(60),
              fontSize: GS(60),
              color: values.colors.main,
            }}
          >
            기본 정보
          </MyText>
          <MyView
            style={{
              marginTop: GS(30),
              borderWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  width: GS(270),
                  color: "#888888",
                  textAlign: "center",
                }}
              >
                건물 정보
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                정우 엔텍 / 경기도 수원시 권선구 산업로 156번길 78, (고색동)
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  width: GS(270),
                  textAlign: "center",
                }}
              >
                승강기 고유번호
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                {params.elevatorNo} / 1(1-1)
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  width: GS(270),
                  textAlign: "center",
                }}
              >
                승강기 종류
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                장애인용
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  textAlign: "center",
                  width: GS(270),
                }}
              >
                승강기 모델
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                XX-VPM(422)
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  width: GS(270),
                  textAlign: "center",
                }}
              >
                점검 일시
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                {formats.date(params.insDate, "yyyy.mm.dd / ktt hh:MM")}
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  width: GS(270),
                  textAlign: "center",
                  color: "#888888",
                }}
              >
                점검자
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                {params.userinfo?.bizName} / {params.userinfo?.userNm} / {params.userinfo?.hp}
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  textAlign: "center",
                  width: GS(270),
                }}
              >
                관리주체
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                {/*  */}
              </MyText>
            </MyView>
          </MyView>
          <MyView
            style={{
              borderLeftWidth: GS(2),
              borderRightWidth: GS(2),
              borderBottomWidth: GS(2),
              borderColor: "#dddddd",
              flexDirection: "row",
            }}
          >
            <MyView
              style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
              }}
            >
              <MyText
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#888888",
                  width: GS(270),
                  textAlign: "center",
                }}
              >
                관리주체 확인일시
              </MyText>
            </MyView>
            <MyView
              style={{
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              <MyText
                font="nsm"
                style={{
                  marginVertical: GS(20),
                  marginHorizontal: GS(30),
                  fontSize: GS(35),
                  color: "#354767",
                }}
              >
                {/*  */}
              </MyText>
            </MyView>
          </MyView>
        </MyView>
        <MyView
          style={{
            backgroundColor: "#ffffff",
            marginTop: GS(30),
            paddingHorizontal: GS(82),
            paddingBottom: GS(82) + values.device.bottomSpaceHeight,
          }}
        >
          <MyText
            font="nsb"
            style={{
              marginTop: GS(100),
              fontSize: GS(60),
              color: values.colors.main,
            }}
          >
            점검 항목별 점검 결과
          </MyText>
          <>
            {checkDetailList && (
              <>
                {(() => {
                  // let codeName = "";
                  // let ndx = 0;
                  return checkDetailList.map((checkDetail, idx) => {
                    let masterName = "";
                    const checkDetailData = checkDetail.checkList;
                    if (!checkDetailData.masterCode) {
                      masterName = checkDetailData.codeContent;
                      let jdx = idx + 1;
                      while (jdx < checkDetailList.length) {
                        const tempCheckDetailData = checkDetailList[jdx].checkList;
                        if (!tempCheckDetailData.masterCode) {
                          break;
                        }
                        jdx++;
                      }

                      return (
                        <MyText
                          key={idx}
                          font="nsb"
                          style={{
                            marginTop: GS(150),
                            fontSize: GS(45),
                            color: values.colors.main,
                            marginBottom: GS(30),
                          }}
                        >
                          # {masterName}
                        </MyText>
                      );
                    } else {
                      return (
                        <MyView
                          key={idx}
                          style={{
                            borderTopWidth: GS(1.5),
                            borderLeftWidth: GS(2),
                            borderRightWidth: GS(2),
                            borderBottomWidth: GS(1.5),
                            borderColor: "#dddddd",
                            flexDirection: "row",
                          }}
                        >
                          <MyView
                            style={{
                              backgroundColor: "#eeeeee",
                              flex: 1,
                            }}
                          >
                            <MyText
                              style={{
                                marginVertical: GS(20),
                                marginHorizontal: GS(30),
                                fontSize: GS(35),
                                color: "#888888",
                                textAlign: "center",
                              }}
                            >
                              {checkDetailData.codeContent}
                            </MyText>
                          </MyView>
                          <MyView
                            style={{
                              alignSelf: "flex-start",
                              width: GS(300),
                              alignItems: "center",
                            }}
                          >
                            <MyText
                              font="nsm"
                              style={{
                                marginVertical: GS(20),
                                marginHorizontal: GS(30),
                                fontSize: GS(35),
                                color: (() => {
                                  let color = "#111111";
                                  if (checkDetail.result === "B") {
                                    color = "#ff9900";
                                  } else if (checkDetail.result === "C") {
                                    color = "#f00f00";
                                  }
                                  return color;
                                })(),
                              }}
                            >
                              {checkDetail.result}
                            </MyText>
                          </MyView>
                        </MyView>
                      );
                    }
                  });
                })()}
              </>
            )}
          </>
        </MyView>
      </MyScrollView>
    </MyLayout>
  );
}

export default CheckDetailLayout;
