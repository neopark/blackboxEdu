import React, { useCallback, useEffect, useState } from "react";
import { Image, Keyboard } from "react-native";
import { Asset } from "react-native-image-picker";
import apis from "../../apis";
import { initialAppState, useAppState } from "../../contexts/appState";
import { initialLoading, useLoading } from "../../contexts/loading";
import { useToast } from "../../contexts/toast";
import MyImage from "../../myComponents/MyImage";
import MyOutsideTouch from "../../myComponents/MyOutsideTouch";
import MyScrollView from "../../myComponents/MyScrollView";
import MyText from "../../myComponents/MyText";
import MyTextarea from "../../myComponents/MyTextarea";
import MyTouch from "../../myComponents/MyTouch";
import MyView from "../../myComponents/MyView";
import MyModal from "../../myTemplates/MyModal";
import { GS } from "../../styles/sizes";
import values from "../../values";
import { T_action } from "../HomeLayout";
import { useUser } from "../../contexts/user";


type T_HomeModalProps = {
  modalAction: T_action;
  setModalAction: (modalAction: T_action) => void;
  setIsImagePickerModalVisible: (isImagePickerModalVisible: boolean) => void;
  imageList: Asset[];
  setImageList: (imageList: Asset[]) => void;
};

function HomeModal({
  modalAction,
  setModalAction,
  setIsImagePickerModalVisible,
  imageList,
  setImageList,
}: T_HomeModalProps) {
  const { loading, setLoading } = useLoading();
  const { setToast } = useToast();
  const { appState,setAppState } = useAppState();
  const [text, setText] = useState("");
  const [action, setAction] = useState<T_action>(null);
  const { user } = useUser();

  const save = useCallback(async () => {
    if (action === "partChange" || action === "troubleshooting") {
      try {
        const result = await apis[action].save({
          files: imageList.map((image) => {
            return {
              uri: image.uri,
              name: image.fileName,
              type: image.type,
            };
          }),
          content: text,
          elevatorNo: appState.connectDevice?.name, //"0055015",
          userId:user.id
        });
        if (result.isSuccess) {
          setToast({
            msg: `${action === "troubleshooting" ? "고장처리가" : "부품교환이"}완료되었습니다.`,
          });
          setModalAction(null);
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
  }, [action, imageList, setModalAction, setToast, text]);

  useEffect(() => {
    if (modalAction) {
      setAction(modalAction);
      setText("");
      setImageList([]);
      return () => {
        setAppState(initialAppState);
      };
    } else {
      Keyboard.dismiss();
    }
  }, [modalAction, setAppState, setImageList]);

  return (
    <MyModal
      isVisible={!!modalAction}
      setIsVisible={() => {
        setModalAction(null);
      }}
      style={{
        backgroundColor: "#f1f2f5",
        width: values.device.width - GS(82 * 2),
        borderRadius: GS(30),
        position: "relative",
      }}
    >
      <MyOutsideTouch onPress={Keyboard.dismiss}>
        <MyView
          style={{
            paddingTop: GS(150),
            paddingHorizontal: GS(20),
            paddingBottom: GS(50),
          }}
        >
          <MyText
            font="nsb"
            style={{
              fontSize: GS(60),
              paddingHorizontal: GS(40),
              color: values.colors.main,
            }}
          >
            {action === "partChange" ? "부품교환" : "고장처리"}
            {"\n"}메모를 작성해주세요.
          </MyText>
          <MyScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row",
              paddingTop: GS(50),
            }}
          >
            <MyTouch
              activeOpacity={1}
              style={{
                flexDirection: "row",
                paddingHorizontal: GS(25),
              }}
            >
              <MyTouch
                onPress={() => {
                  setIsImagePickerModalVisible(true);
                }}
                style={{
                  backgroundColor: "#ffffff",
                  width: GS(210),
                  height: GS(210),
                  borderRadius: GS(30),
                  marginRight: GS(15),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MyImage name="camera" />
                <MyText
                  style={{
                    fontSize: GS(35),
                    color: "#333333",
                    marginTop: GS(10),
                  }}
                >
                  {imageList.length}/10
                </MyText>
              </MyTouch>
              {imageList.map((image, idx) => {
                return (
                  <MyView
                    key={idx}
                    style={{
                      backgroundColor: "#ffffff",
                      width: GS(210),
                      height: GS(210),
                      borderRadius: GS(30),
                      marginRight: imageList.length - 1 === idx ? 0 : GS(15),
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: GS(30),
                        width: GS(200),
                        height: GS(200),
                      }}
                      source={{
                        uri: image.uri,
                      }}
                    />
                    <MyTouch
                      onPress={() => {
                        const newImageList = [...imageList];
                        newImageList.splice(idx, 1);
                        setImageList(newImageList);
                      }}
                      style={{
                        position: "absolute",
                        padding: GS(20),
                        top: GS(-40),
                        right: GS(-35),
                      }}
                    >
                      <MyImage name="delete" />
                    </MyTouch>
                  </MyView>
                );
              })}
            </MyTouch>
          </MyScrollView>
          <MyTextarea
            value={text}
            placeholder="메모"
            onChangeText={setText}
            multiline={true}
            style={{
              marginTop: GS(35),
              backgroundColor: "#ffffff",
              marginHorizontal: GS(25),
            }}
          />
          <MyTouch
            onPress={async () => {
              if (!loading) {
                if (text.trim().length === 0) {
                  setToast({
                    msg: "메모를 작성해 주세요.",
                  });
                } else {
                  setLoading("save");
                  await save();
                  setLoading(initialLoading);
                }
              }
            }}
            style={{
              backgroundColor: values.colors.main,
              height: GS(160),
              borderRadius: GS(20),
              marginTop: GS(35),
              marginHorizontal: GS(25),
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
              {action === "partChange" ? "교환" : "처리"}완료
            </MyText>
          </MyTouch>
        </MyView>
      </MyOutsideTouch>
      <MyTouch
        onPress={() => {
          setModalAction(null);
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

export default HomeModal;
