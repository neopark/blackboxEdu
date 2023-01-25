import React, { useCallback, useState } from "react";
import MyView from "../../myComponents/MyView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import values from "../../values";
import MyImage from "../../myComponents/MyImage";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyHeader from "../../myTemplates/MyHeader";
import useNav from "../../uses/useNav";
import { GS } from "../../styles/sizes";
import { T_terms } from "../../apis/terms";
import apis from "../../apis";
import { useToast } from "../../contexts/toast";
import { initialLoading, useLoading } from "../../contexts/loading";
import MyScrollView from "../../myComponents/MyScrollView";
import MyLayout from "../../myTemplates/MyLayout";
import useNavParams from "../../uses/useNavParams";

function TermsLayout() {
  const nav = useNav();
  const params = useNavParams();
  const { setToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [termsList, setTermsList] = useState<T_terms[]>([]);
  let isAllCheck = true;
  for (let idx = 0; idx < termsList.length; idx++) {
    if (!termsList[idx].isCheck) {
      isAllCheck = false;
      break;
    }
  }

  const getTermsList = useCallback(async () => {
    try {
      const result = await apis.terms.get();
      if (result.isSuccess) {
        setTermsList(result.termsList);
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
  }, [setToast]);

  const next = useCallback(() => {
    if (termsList.length !== 0) {
      let isNext = true;
      for (let idx = 0; idx < termsList.length; idx++) {
        if (termsList[idx].isRequire && !termsList[idx].isCheck) {
          isNext = false;
          break;
        }
      }
      if (!isNext) {
        setToast({
          msg: "필수 약관을 모두 동의해 주세요.",
        });
      } else {
        nav.navigate("InputLayout", params);
      }
    }
  }, [nav, params, setToast, termsList]);

  const getItem = useCallback(
    (terms: T_terms) => {
      let title = terms.title;
      if (terms.id !== "") {
        title += terms.isRequire ? "(필수)" : "(선택)";
      }

      return (
        <MyView
          key={terms.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: GS(35),
            height: GS(110),
          }}
        >
          <MyTouch
            style={{
              paddingHorizontal: GS(5),
              paddingVertical: GS(15),
            }}
            onPress={() => {
              nav.navigate("TermsDetailLayout", {
                terms,
              });
            }}
          >
            <MyText
              style={{
                fontSize: terms.id !== "" ? undefined : GS(50),
                color: terms.id !== "" ? "#111111" : "#222222",
              }}
            >
              {title}
            </MyText>
          </MyTouch>
          <MyView
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <MyTouch
              onPress={() => {
                if (!terms.id) {
                  const newTermsList = [...termsList];
                  for (let idx = 0; idx < newTermsList.length; idx++) {
                    newTermsList[idx].isCheck = !isAllCheck;
                  }
                  setTermsList(newTermsList);
                } else {
                  const newTermsList = [...termsList];
                  for (let idx = 0; idx < newTermsList.length; idx++) {
                    if (terms.id === newTermsList[idx].id) {
                      newTermsList[idx].isCheck = !newTermsList[idx].isCheck;
                      break;
                    }
                  }
                  setTermsList(newTermsList);
                }
              }}
              style={{
                padding: GS(15),
              }}
            >
              <MyImage name={terms.isCheck ? "register_checking" : "register_checking_none"} />
            </MyTouch>
          </MyView>
        </MyView>
      );
    },
    [isAllCheck, nav, termsList]
  );

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" />
      <MyScrollView
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingHorizontal: GS(82),
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
        onInit={async () => {
          setLoading("init");
          await getTermsList();
          setLoading(initialLoading);
        }}
        onRefresh={async () => {
          if (!loading) {
            setTermsList([]);
            await getTermsList();
          }
        }}
      >
        <MyText
          font="nsb"
          style={{
            marginTop: GS(50),
            fontSize: GS(80),
            color: values.colors.main,
          }}
        >
          사용자 약관동의
        </MyText>
        <MyText
          style={{
            marginTop: GS(90),
            fontSize: GS(50),
            color: "#222222",
          }}
        >
          회원가입을 위해서는 아래 내용에{"\n"}동의가 필요합니다.
        </MyText>
        <MyView
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {!!termsList.length && (
            <MyView
              style={{
                marginVertical: GS(200),
              }}
            >
              {getItem({
                id: "",
                text: "",
                title: "전체동의",
                isCheck: isAllCheck,
                isRequire: false,
              })}
              <MyView
                style={{
                  marginTop: GS(90),
                }}
              >
                {termsList.map((terms) => {
                  return getItem(terms);
                })}
              </MyView>
            </MyView>
          )}
        </MyView>
        <MyView
          style={{
            justifyContent: "flex-end",
          }}
        >
          <MyText
            style={{
              fontSize: GS(40),
              marginBottom: GS(110),
            }}
          >
            필수선택항목에 동의하지 않으시면 서비스를 이용하실{"\n"}수 없습니다.
          </MyText>
          <MyTouch
            onPress={next}
            style={{
              height: GS(160),
              backgroundColor: values.colors.main,
              borderRadius: GS(20),
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
              다음
            </MyText>
          </MyTouch>
        </MyView>
      </MyScrollView>
    </MyLayout>
  );
}

export default TermsLayout;
