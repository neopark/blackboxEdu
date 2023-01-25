import React, { useCallback, useState } from "react";
import MyView from "../../myComponents/MyView";
import MyStatusBar from "../../myComponents/MyStatusBar";
import MyHeader from "../../myTemplates/MyHeader";
import MyScrollView from "../../myComponents/MyScrollView";
import MyText from "../../myComponents/MyText";
import values from "../../values";
import MyTouch from "../../myComponents/MyTouch";
import MyImage from "../../myComponents/MyImage";
import useNavParams from "../../uses/useNavParams";
import { GS } from "../../styles/sizes";
import DetailModal from "./detail/DetailModal";
import { initialLoading, useLoading } from "../../contexts/loading";
import { useToast } from "../../contexts/toast";
import apis from "../../apis";
import useNav from "../../uses/useNav";
import {
  T_checkDetailState,
  T_checkDetailType,
  T_checkState,
  T_setCheckState,
} from "../../contexts/checkStateList";
import MyLayout from "../../myTemplates/MyLayout";

function DetailLayout() {
  const { setLoading } = useLoading();
  const { setToast } = useToast();
  const nav = useNav();
  const navParams = useNavParams();
  const checkState: T_checkState = navParams.checkState;
  const setCheckState: T_setCheckState = navParams.setCheckState;
  const typeList: T_checkDetailType[] = ["b", "c", "except"];
  const [selType, setSelType] = useState<T_checkDetailType>("b");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkDetailStateList, setCheckDetailStateList] = useState<T_checkDetailState[]>([]);
  let selTypeName = "";
  if (selType === "except") {
    selTypeName = "제외";
  } else {
    selTypeName = `${selType.toUpperCase()} 선택`;
  }

  const getCheck = useCallback(async () => {
    try {
      const result = await apis.check.getDetail({
        masterCode: checkState.code,
        type: "A",
      });
      if (result.isSuccess) {
        const newCheckDetailStateList: T_checkDetailState[] = [];
        for (let idx = 0; idx < result.detailList.length; idx++) {
          const checkDetail = result.detailList[idx];
          newCheckDetailStateList.push({
            ...checkDetail,
            type: null,
          });
        }
        setCheckDetailStateList(newCheckDetailStateList);
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
  }, [checkState, setToast]);

  return (
    <MyLayout>
      <MyStatusBar backgroundColor="#f1f2f5" />
      <MyHeader backgroundColor="#f1f2f5" leftComponentName="back" />
      <MyScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingTop: GS(20),
          paddingBottom: values.device.bottomSpaceHeight + GS(82),
        }}
        onInit={async () => {
          if (checkState.detailList) {
            setCheckDetailStateList(checkState.detailList);
          } else {
            setLoading("onInit");
            await getCheck();
            setLoading(initialLoading);
          }
        }}
      >
        <MyView
          style={{
            paddingHorizontal: GS(82),
          }}
        >
          <MyText
            font="nsb"
            style={{
              marginTop: GS(10),
              fontSize: GS(80),
              color: values.colors.main,
            }}
          >
            {checkState.codeContent}
          </MyText>
          <MyTouch
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={{
              height: GS(135),
              borderRadius: GS(135 / 2),
              marginTop: GS(40),
              backgroundColor: values.colors.main,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: GS(80),
            }}
          >
            <MyText
              style={{
                fontSize: GS(50),
                color: "#ffffff",
              }}
            >
              {selTypeName}
            </MyText>
            <MyView
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <MyImage
                style={{
                  transform: [
                    {
                      rotate: "90deg",
                    },
                  ],
                }}
                name="detailview_white"
              />
            </MyView>
          </MyTouch>
        </MyView>
        {!!checkDetailStateList.length && (
          <>
            <MyView
              style={{
                flex: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: GS(82),
                borderTopLeftRadius: GS(20),
                borderTopRightRadius: GS(20),
                paddingTop: GS(30),
                marginTop: GS(50),
                paddingBottom: GS(82) + values.device.bottomSpaceHeight,
              }}
            >
              {checkDetailStateList.map((checkDetail, idx) => {
                const isSel = checkDetail.type === selType;
                const isCheck = !!checkDetail.type;
                let text = "";
                if (checkDetail.codeName) {
                  text += `${checkDetail.codeName} - `;
                }
                text += checkDetail.codeContent;

                return (
                  <MyView key={idx}>
                    <MyTouch
                      onPress={() => {
                        const newCheckDetailList = [...checkDetailStateList];
                        newCheckDetailList[idx].type = isSel ? null : selType;
                        setCheckDetailStateList(newCheckDetailList);
                      }}
                      style={{
                        height: GS(140),
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: GS(10),
                        marginVertical: GS(3),
                        marginTop: GS(5),
                      }}
                    >
                      <MyText
                        font={isCheck ? "nsl" : "nsr"}
                        style={{
                          color: isCheck ? "#bbbbbb" : "#333333",
                          textDecorationLine: isCheck ? "line-through" : undefined,
                        }}
                      >
                        {text}
                      </MyText>
                      <MyView
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                        }}
                      >
                        <MyImage name={isSel ? "check_ok" : "check_none"} />
                      </MyView>
                    </MyTouch>
                    <MyView
                      style={{
                        height: GS(1),
                        backgroundColor: "#999999",
                      }}
                    />
                  </MyView>
                );
              })}
            </MyView>
            <MyTouch
              onPress={() => {
                setCheckState({
                  ...checkState,
                  detailList: checkDetailStateList,
                });
                nav.goBack();
              }}
              style={{
                height: GS(160),
                backgroundColor: values.colors.main,
                borderRadius: GS(20),
                marginTop: GS(82),
                marginHorizontal: GS(82),
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
                확인
              </MyText>
            </MyTouch>
          </>
        )}
      </MyScrollView>
      <DetailModal
        selType={selType}
        typeList={typeList}
        isModalVisible={isModalVisible}
        setSelType={setSelType}
        setIsModalVisible={setIsModalVisible}
      />
    </MyLayout>
  );
}

export default DetailLayout;
