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
import { T_partChange } from "../../apis/partChange";

function PartChangeLayoutLayout() {
  const { setToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [partChangeList, setPartChangeLayoutList] = useState<T_partChange[]>([]);
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getCheckRecord = useCallback(
    async (newPage: number) => {
      if (user.id) {
        try {
          const result = await apis.partChange.getList({
            page: newPage,
            pagesize: 10,
            // insUserId: user.id,
          });
          if (result.isSuccess) {
            let newPartChangeLayoutList: T_partChange[] =
              newPage === 1 ? result.partChangeList : partChangeList.concat(result.partChangeList);
            setTotalPage(result.totalPage);
            setPage(newPage);
            setPartChangeLayoutList(newPartChangeLayoutList);
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
    [partChangeList, setToast, user.id]
  );

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyFlatList
        data={partChangeList.length === 0 ? [1] : partChangeList}
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
            setPartChangeLayoutList([]);
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
          backgroundColor: partChangeList.length === 0 ? undefined : "#ffffff",
          paddingBottom: partChangeList.length ? values.device.bottomSpaceHeight + GS(82) : 0,
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
                  ????????????????????? ????????????.
                </MyText>
              </MyView>
            );
          } else {
            const partChange: T_partChange = props.item;
            console.log(partChange.elevinfo);
            return (
              // <MyTouch
              //   disabled={isChecking}
              //   onPress={() => {
              //     nav.navigate("CheckDetailLayout", partChange);
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
                  ???{"  "}
                  {formats.date(partChange.insDate, "yyyy.mm.dd")}
                </MyText>
                <MyView>
                  <MyView key={partChange.idx}>
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
                          ?????????:
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
                          ??? ??? ??? ???:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                          }}
                        >
                          {formats.date(partChange.insDate, "yyyy??? m??? dd??? HH??? MM???")}
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
                          ???????????????:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                          }}
                        >
                          {partChange.elevatorNo}
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
                          ???{"            "}???:
                        </MyText>
                        <MyText
                          font="nsm"
                          style={{
                            fontSize: GS(35),
                            color: "#666666",
                            flex: 1,
                          }}
                        >
                          {partChange.elevinfo?.address1 + ", " + partChange.elevinfo?.address2}
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
                          ???{"            "}???:
                        </MyText>
                        <MyText
                          font="nsb"
                          style={{
                            color: values.colors.main,
                            fontSize: GS(35),
                          }}
                        >
                          {partChange.content}
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
                      nav.navigate("CheckDetailLayout", partChange);
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
                ??????????????????
              </MyText>
            </MyView>
          );
        }}
      />
    </MyLayout>
  );
}

export default PartChangeLayoutLayout;
