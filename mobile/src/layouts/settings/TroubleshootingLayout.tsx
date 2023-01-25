import React, { useCallback, useState } from "react";
import MyView from "../../myComponents/MyView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import { GS } from "../../styles/sizes";
import MyHeader from "../../myTemplates/MyHeader";
import MyText from "../../myComponents/MyText";
import MyFlatList from "../../myComponents/MyFlatList";
import { initialLoading, useLoading } from "../../contexts/loading";
import { useToast } from "../../contexts/toast";
import apis from "../../apis";
import formats from "../../modules/formats";
import MyLayout from "../../myTemplates/MyLayout";
import { useUser } from "../../contexts/user";
import { T_troubleshooting } from "../../apis/troubleshooting";

function TroubleshootingLayout() {
  const { setToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [troubleshootingList, setTroubleshootingList] = useState<T_troubleshooting[]>([]);
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getCheckRecord = useCallback(
    async (newPage: number) => {
      if (user.id) {
        try {
          const result = await apis.troubleshooting.getList({
            page: newPage,
            pagesize: 10,
            insUserId: user.id,
          });
          if (result.isSuccess) {
            let newTroubleshootingList: T_troubleshooting[] =
              newPage === 1
                ? result.troubleshootingList
                : troubleshootingList.concat(result.troubleshootingList);
            setTotalPage(result.totalPage);
            setPage(newPage);
            setTroubleshootingList(newTroubleshootingList);
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
    },
    [troubleshootingList, setToast, user.id]
  );

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyFlatList
        data={troubleshootingList.length === 0 ? [1] : troubleshootingList}
        style={{
          flex: 1,
          backgroundColor: "#f1f2f5",
        }}
        onInit={async () => {
          setLoading("init");
          await getCheckRecord(1);
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          if (!loading) {
            setTroubleshootingList([]);
            await getCheckRecord(1);
          }
        }}
        onEndReached={async () => {
          if (!loading && page < totalPage) {
            setLoading("onEndReached");
            await getCheckRecord(page + 1);
            setLoading(initialLoading);
          }
        }}
        contentContainerStyle={{
          backgroundColor: troubleshootingList.length === 0 ? undefined : "#ffffff",
          paddingBottom: troubleshootingList.length ? values.device.bottomSpaceHeight + GS(82) : 0,
        }}
        renderItem={(props) => {
          if (props.item === 1) {
            return (
              <MyView
                style={{
                  margin: GS(82),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: GS(30),
                  padding: GS(50),
                }}
              >
                <MyText
                  font="nsb"
                  style={{
                    fontSize: GS(40),
                    color: values.colors.main,
                  }}
                >
                  고장처리이력이 없습니다.
                </MyText>
              </MyView>
            );
          } else {
            const troubleshooting: T_troubleshooting = props.item;
            console.log(troubleshooting.elevinfo);
            return (
              // <MyTouch
              //   disabled={isChecking}
              //   onPress={() => {
              //     nav.navigate("CheckDetailLayout", troubleshooting);
              //   }}
              // >
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
                    marginTop: GS(30),
                    fontSize: GS(40),
                    color: values.colors.main,
                  }}
                >
                  •{"  "}
                  {formats.date(troubleshooting.insDate, "yyyy.mm.dd")}
                </MyText>
                <MyView>
                  <MyView key={troubleshooting.idx}>
                    <MyView
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: GS(20),
                        paddingRight: GS(60),
                        marginBottom: GS(70),
                        // flexDirection: "row",
                      }}
                    >
                      <MyView
                        style={{
                          flexDirection: "row",
                          marginTop: GS(30),
                          alignItems: "center",
                        }}
                      >
                        <MyText
                          font="nsr"
                          style={{
                            width: GS(230),
                            color: "#aaaaaa",
                            fontSize: GS(35),
                          }}
                        >
                          담당자:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                          }}
                        >
                          {user.name}
                        </MyText>
                      </MyView>
                      <MyView
                        style={{
                          flexDirection: "row",
                          marginTop: GS(10),
                          alignItems: "center",
                        }}
                      >
                        <MyText
                          font="nsr"
                          style={{
                            width: GS(230),
                            color: "#aaaaaa",
                            fontSize: GS(35),
                            letterSpacing: GS(1),
                          }}
                        >
                          점 검 일 시:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                          }}
                        >
                          {formats.date(troubleshooting.insDate, "yyyy년 m월 dd일 HH시 MM분")}
                        </MyText>
                      </MyView>
                      <MyView
                        style={{
                          flexDirection: "row",
                          marginTop: GS(10),
                          alignItems: "center",
                        }}
                      >
                        <MyText
                          font="nsr"
                          style={{
                            width: GS(230),
                            color: "#aaaaaa",
                            fontSize: GS(35),
                          }}
                        >
                          엘리베이터:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                          }}
                        >
                          {troubleshooting.elevatorNo}
                        </MyText>
                      </MyView>
                      <MyView
                        style={{
                          flexDirection: "row",
                          marginTop: GS(10),
                          alignItems: "center",
                        }}
                      >
                        <MyText
                          font="nsr"
                          style={{
                            width: GS(230),
                            color: "#aaaaaa",
                            fontSize: GS(35),
                          }}
                        >
                          주{"            "}소:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                            flex: 1,
                          }}
                        >
                          {troubleshooting.elevinfo?.address1 +
                            ", " +
                            troubleshooting.elevinfo?.address2}
                        </MyText>
                      </MyView>
                      <MyView
                        style={{
                          flexDirection: "row",
                          marginTop: GS(10),
                          alignItems: "center",
                        }}
                      >
                        <MyText
                          font="nsr"
                          style={{
                            width: GS(230),
                            color: "#aaaaaa",
                            fontSize: GS(35),
                          }}
                        >
                          내{"            "}용:
                        </MyText>
                        <MyText
                          font="nsb"
                          style={{
                            color: values.colors.main,
                            fontSize: GS(35),
                          }}
                        >
                          {troubleshooting.content}
                        </MyText>
                      </MyView>
                    </MyView>
                    <MyView
                      style={{
                        height: GS(2),
                        backgroundColor: "#dddddd",
                      }}
                    />
                  </MyView>
                </MyView>
                {/* {!isChecking && (
                  <MyTouch
                    style={{
                      paddingVertical: GS(30),
                      paddingHorizontal: GS(30),
                      position: "absolute",
                      top: GS(100),
                      right: GS(100),
                      borderColor: "#dddddd",
                      borderWidth: GS(1),
                      borderRadius: GS(20),
                    }}
                    onPress={() => {
                      nav.navigate("CheckDetailLayout", troubleshooting);
                    }}
                  >
                    <MyIcon color="#888" size={GS(50)} name="right" />
                  </MyTouch>
                )} */}
              </MyView>
              // </MyTouch>
            );
          }
        }}
        ListHeaderComponent={() => {
          return (
            <MyView
              style={{
                paddingTop: GS(20),
                height: GS(250),
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
                고장처리이력
              </MyText>
            </MyView>
          );
        }}
      />
    </MyLayout>
  );
}

export default TroubleshootingLayout;
