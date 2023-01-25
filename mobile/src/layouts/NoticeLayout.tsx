import React, { useCallback, useState } from "react";
import MyView from "../myComponents/MyView";
import MyStatusBar from "../myComponents/MyStatusBar";
import values from "../values";
import { GS } from "../styles/sizes";
import MyHeader from "../myTemplates/MyHeader";
import MyText from "../myComponents/MyText";
import MyImage from "../myComponents/MyImage";
import MyFlatList from "../myComponents/MyFlatList";
import { T_notice } from "../apis/notice";
import { initialLoading, useLoading } from "../contexts/loading";
import { useToast } from "../contexts/toast";
import apis from "../apis";
import formats from "../modules/formats";
import MyLayout from "../myTemplates/MyLayout";
import { useUser } from "../contexts/user";

type T_noticeDay = {
  date: string;
  noticeList: T_notice[];
};

function NoticeLayout() {
  const { setToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [noticeDayList, setNoticeDayList] = useState<T_noticeDay[]>([]);
  const [noticeList, setNoticeList] = useState<T_notice[]>([]);
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getNoticeList = useCallback(
    async (newPage: number) => {
      if (user.id) {
        try {
          const result = await apis.notice.get({
            page: newPage,
            pagesize: 20,
            userId: user.id,
          });
          if (result.isSuccess) {
            let newNoticeDayList: T_noticeDay[] = [];
            let newNoticeList: T_notice[] =
              newPage === 1 ? result.noticeList : noticeList.concat(result.noticeList);
            if (result.noticeList.length) {
              let prevNoticeList = [newNoticeList[0]];
              let prevDate = newNoticeList[0].insDate;
              for (let idx = 1; idx < newNoticeList.length; idx++) {
                const notice = newNoticeList[idx];
                if (prevDate.slice(0, 10) !== notice.insDate.slice(0, 10)) {
                  newNoticeDayList.push({
                    date: prevDate,
                    noticeList: prevNoticeList,
                  });
                  prevDate = notice.insDate;
                  prevNoticeList = [notice];
                } else {
                  prevNoticeList.push(notice);
                }
              }
              newNoticeDayList.push({
                date: prevDate,
                noticeList: prevNoticeList,
              });
            }
            setTotalPage(result.totalPage);
            setPage(newPage);
            setNoticeList(newNoticeList);
            setNoticeDayList(newNoticeDayList);
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
    [noticeList, setToast, user]
  );

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyFlatList
        data={noticeDayList.length === 0 ? [1] : noticeDayList}
        style={{
          flex: 1,
          backgroundColor: "#f1f2f5",
        }}
        onInit={async () => {
          setLoading("init");
          await getNoticeList(1);
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          if (!loading) {
            setNoticeDayList([]);
            await getNoticeList(1);
          }
        }}
        onEndReached={async () => {
          if (!loading && page < totalPage) {
            setLoading("onEndReached");
            await getNoticeList(page + 1);
            setLoading(initialLoading);
          }
        }}
        contentContainerStyle={{
          backgroundColor: noticeDayList.length === 0 ? undefined : "#ffffff",
          paddingBottom: noticeDayList.length ? values.device.bottomSpaceHeight + GS(82) : 0,
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
                  알림이 없습니다.
                </MyText>
              </MyView>
            );
          } else {
            const noticeDay: T_noticeDay = props.item;
            return (
              <MyView
                style={{
                  paddingTop: GS(30),
                  paddingHorizontal: GS(82),
                }}
              >
                <MyText
                  font="nsb"
                  style={{
                    marginTop: GS(45),
                    fontSize: GS(40),
                    color: values.colors.main,
                  }}
                >
                  •{"  "}
                  {formats.date(noticeDay.date, "yyyy.mm.dd")}
                </MyText>
                <MyView>
                  {noticeDay.noticeList.map((notice, jdx) => {
                    return (
                      <MyView key={jdx}>
                        <MyView
                          style={{
                            height: GS(255),
                            backgroundColor: "#ffffff",
                            borderRadius: GS(20),
                            paddingVertical: GS(50),
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
                        <MyView
                          style={{
                            height: GS(2),
                            backgroundColor: "#dddddd",
                          }}
                        />
                      </MyView>
                    );
                  })}
                </MyView>
              </MyView>
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
                알림리스트
              </MyText>
            </MyView>
          );
        }}
      />
    </MyLayout>
  );
}

export default NoticeLayout;
