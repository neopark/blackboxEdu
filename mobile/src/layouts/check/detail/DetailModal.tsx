import React from "react";
import MyText from "../../../myComponents/MyText";
import MyTouch from "../../../myComponents/MyTouch";
import { GS } from "../../../styles/sizes";
import MyModal from "../../../myTemplates/MyModal";
import { T_checkDetailType } from "../../../contexts/checkStateList";

type T_DetailModalProps = {
  selType: T_checkDetailType;
  typeList: T_checkDetailType[];
  isModalVisible: boolean;
  setSelType: (type: T_checkDetailType) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

function DetailModal({
  selType,
  typeList,
  isModalVisible,
  setSelType,
  setIsModalVisible,
}: T_DetailModalProps) {
  return (
    <MyModal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      style={{
        width: GS(700),
        backgroundColor: "#ffffff",
        borderRadius: GS(30),
        paddingVertical: GS(30),
      }}
    >
      {typeList.map((type, idx) => {
        const isSel = type === selType;
        let selTypeName = "";
        if (type === "except") {
          selTypeName = "제외";
        } else {
          selTypeName = `${type.toUpperCase()} 선택`;
        }

        return (
          <MyTouch
            key={idx}
            disabled={isSel}
            style={{
              paddingVertical: GS(40),
              paddingHorizontal: GS(60),
            }}
            onPress={() => {
              setSelType(type);
              setIsModalVisible(false);
            }}
          >
            <MyText
              font={isSel ? "nsl" : "nsr"}
              style={{
                color: isSel ? "#888888" : "#333333",
              }}
            >
              {selTypeName}
            </MyText>
          </MyTouch>
        );
      })}
    </MyModal>
  );
}

export default DetailModal;
