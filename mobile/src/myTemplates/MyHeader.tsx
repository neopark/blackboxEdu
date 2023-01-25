import React from "react";
import MyImage, { T_MyImageName } from "../myComponents/MyImage";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import useNav from "../uses/useNav";
import values from "../values";

export type T_MyHeaderProps = {
  leftComponentName?: "back";
  rightComponent?: JSX.Element;
  backgroundColor?: string;
};

function MyHeader({ leftComponentName, rightComponent, backgroundColor }: T_MyHeaderProps) {
  const nav = useNav();
  let iconName = leftComponentName as string;
  if (leftComponentName === "back") {
    iconName = "prev";
  }

  return (
    <MyView
      style={{
        height: values.device.headerHeight,
        width: values.device.width,
        backgroundColor: backgroundColor || "#ffffff",
        borderBottomWidth: GS(1),
        paddingHorizontal: GS(20),
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <MyView
        style={{
          flex: 1,
        }}
      >
        {leftComponentName && (
          <MyTouch
            onPress={() => {
              if (leftComponentName === "back") {
                nav.goBack();
              }
            }}
            style={{
              padding: GS(20),
              alignSelf: "flex-start",
            }}
          >
            <MyImage name={iconName as T_MyImageName} />
          </MyTouch>
        )}
      </MyView>
      <MyView
        style={{
          flex: 1,
        }}
      />
      <MyView
        style={{
          flex: 1,
        }}
      >
        {rightComponent}
      </MyView>
    </MyView>
  );
}

export default MyHeader;
