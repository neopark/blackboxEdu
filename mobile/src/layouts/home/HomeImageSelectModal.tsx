import React, { useCallback } from "react";
import { Asset } from "react-native-image-picker";
import { useAlert } from "../../contexts/alert";
import { useToast } from "../../contexts/toast";
import imagePicker from "../../modules/imagePicker";
import permission from "../../modules/permission";
import MyIcon from "../../myComponents/MyIcon";
import MyImage from "../../myComponents/MyImage";
import MyText from "../../myComponents/MyText";
import MyTouch from "../../myComponents/MyTouch";
import MyView from "../../myComponents/MyView";
import MyModal from "../../myTemplates/MyModal";
import { GS } from "../../styles/sizes";
import values from "../../values";

type T_HomeImageSelectModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  imageList: Asset[];
  setImageList: (imageList: Asset[]) => void;
};

function HomeImageSelectModal({
  isVisible,
  setIsVisible,
  imageList,
  setImageList,
}: T_HomeImageSelectModalProps) {
  const { setToast } = useToast();
  const { setAlert } = useAlert();

  const openCamera = useCallback(async () => {
    const msg = await permission.requestCamera();
    if (msg !== "success") {
      if (msg.includes("권한을 변경하시겠습니까?")) {
        setAlert({
          msg,
          buttonList: [
            {
              text: "취소",
            },
            {
              text: "확인",
              color: values.colors.blue,
              onPress: permission.openSettings,
            },
          ],
        });
      } else {
        setAlert({
          msg,
        });
      }
    } else {
      setIsVisible(false);
      try {
        let newImageList = await imagePicker.openCamera();
        if (newImageList) {
          newImageList = [...imageList].concat(newImageList);
          setImageList(newImageList);
        }
      } catch (err: any) {
        setToast({
          msg: err.message,
        });
      }
    }
  }, [imageList, setAlert, setImageList, setIsVisible, setToast]);

  const openGallery = useCallback(async () => {
    setIsVisible(false);
    try {
      let newImageList = await imagePicker.openGallery();
      if (newImageList) {
        newImageList = [...imageList].concat(newImageList);
        setImageList(newImageList);
      }
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
  }, [imageList, setImageList, setIsVisible, setToast]);

  return (
    <MyModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      isBottom={true}
      style={{
        backgroundColor: "#f1f2f5",
        width: values.device.width,
        borderTopLeftRadius: GS(30),
        borderTopRightRadius: GS(30),
        position: "relative",
      }}
    >
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
          사진 첨부
        </MyText>
        <MyView
          style={{
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
              onPress={openCamera}
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
                카메라
              </MyText>
            </MyTouch>
            <MyTouch
              onPress={openGallery}
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
              <MyIcon size={GS(70)} color="#202320" name="picture" />
              <MyText
                style={{
                  fontSize: GS(35),
                  color: "#333333",
                  marginTop: GS(10),
                }}
              >
                갤러리
              </MyText>
            </MyTouch>
          </MyTouch>
        </MyView>
      </MyView>
      <MyTouch
        onPress={() => {
          setIsVisible(false);
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

export default HomeImageSelectModal;
