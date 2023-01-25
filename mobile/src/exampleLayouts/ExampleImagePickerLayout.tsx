import React, { useCallback, useState } from "react";
import MyHeader from "../myTemplates/MyHeader";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";
import MyButton from "../myTemplates/MyButton";
import imagePicker from "../modules/imagePicker";
import { Image } from "react-native";
import MyScrollView from "../myComponents/MyScrollView";
import MyText from "../myComponents/MyText";
import permission from "../modules/permission";
import { useToast } from "../contexts/toast";
import { useAlert } from "../contexts/alert";
import MyLayout from "../myTemplates/MyLayout";

function ExampleImagePickerLayout() {
  const { setToast } = useToast();
  const { setAlert } = useAlert();
  const [imageList, setImageList] = useState<any>([]);

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
      try {
        const newImageList = await imagePicker.openCamera();
        if (newImageList) {
          setImageList([...imageList].concat(newImageList));
        }
      } catch (err: any) {
        setToast({
          msg: err.message,
        });
      }
    }
  }, [imageList, setAlert, setToast]);

  const openGallery = useCallback(async () => {
    try {
      const newImageList = await imagePicker.openGallery();
      if (newImageList) {
        setImageList([...imageList].concat(newImageList));
      }
    } catch (err: any) {
      setToast({
        msg: err.message,
      });
    }
  }, [imageList, setToast]);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Image Picker" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingTop: GS(15),
          paddingBottom: GS(15) + values.device.bottomSpaceHeight,
        }}
      >
        <MyView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: GS(15),
          }}
        >
          <MyButton onPress={openCamera}>Open Camera</MyButton>
          <MyButton onPress={openGallery}>Open Gallery</MyButton>
        </MyView>
        {!!imageList.length && (
          <>
            <MyText
              style={{
                marginTop: GS(20),
                marginLeft: GS(20),
              }}
              font="nsm"
            >
              Image List
            </MyText>
            <MyView>
              <MyScrollView
                horizontal={true}
                style={{
                  width: values.device.width,
                }}
                contentContainerStyle={{
                  paddingVertical: GS(5),
                  paddingHorizontal: GS(17.5),
                }}
              >
                {imageList.map((image: any) => {
                  return (
                    <Image
                      key={image.uri}
                      style={{
                        width: GS(100),
                        height: GS(100),
                        borderRadius: GS(5),
                        margin: GS(2.5),
                      }}
                      source={{
                        uri: image.uri,
                      }}
                    />
                  );
                })}
              </MyScrollView>
            </MyView>
          </>
        )}
      </MyView>
    </MyLayout>
  );
}

export default ExampleImagePickerLayout;
