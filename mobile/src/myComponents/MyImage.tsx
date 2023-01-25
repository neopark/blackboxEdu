import React from "react";
import { Image, ImageProps, ImageStyle } from "react-native";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_MyImageName =
  | "app_logo"
  | "image_0"
  | "image_1"
  | "image_2"
  | "image_3"
  | "image_4"
  | "top_icon2"
  | "ico_naver"
  | "ico_kakao"
  | "ico_google"
  | "ico_apple"
  | "interrogation"
  | "blackbox"
  | "detailview_white"
  | "component"
  | "breakdown"
  | "plus"
  | "alarm"
  | "main_bg"
  | "settings"
  | "checklist"
  | "user"
  | "bell"
  | "prev"
  | "register_checking"
  | "register_checking_none"
  | "check_ok"
  | "check_none"
  | "camera"
  | "closed"
  | "delete";

export interface MyImageType extends Image {}

export interface T_MyImageProps extends Partial<ImageProps> {
  name: T_MyImageName;
}

const MyImage = React.forwardRef<MyImageType, T_MyImageProps>((props, ref) => {
  const { name } = props;
  const style = {
    borderColor: "#eeeeee",
    ...(props.style as ImageStyle),
  };

  switch (name) {
    case "app_logo": {
      const source =
        values.app.type === "basic"
          ? require("../images/basic_app_logo.png")
          : require("../images/pro_app_logo.png");

      return (
        <Image
          {...props}
          ref={ref}
          style={{
            width: GS(50),
            height: GS(50),
            ...style,
          }}
          source={source}
        />
      );
    }
    case "image_0": {
      return <Image {...props} ref={ref} source={require("../images/image_0.jpg")} />;
    }
    case "image_1": {
      return <Image {...props} ref={ref} source={require("../images/image_1.jpg")} />;
    }
    case "image_2": {
      return <Image {...props} ref={ref} source={require("../images/image_2.jpg")} />;
    }
    case "image_3": {
      return <Image {...props} ref={ref} source={require("../images/image_3.jpg")} />;
    }
    case "image_4": {
      return <Image {...props} ref={ref} source={require("../images/image_4.jpg")} />;
    }
    case "top_icon2": {
      return (
        <Image
          {...props}
          ref={ref}
          style={{
            width: GS(190),
            height: GS(190),
            ...style,
          }}
          source={require("../images/top_icon2.png")}
        />
      );
    }
    case "ico_naver": {
      return (
        <Image
          style={{
            width: GS(160),
            height: GS(160),
            ...style,
          }}
          source={require("../images/ico_naver.png")}
        />
      );
    }
    case "ico_kakao": {
      return (
        <Image
          style={{
            width: GS(160),
            height: GS(160),
            ...style,
          }}
          source={require("../images/ico_kakao.png")}
        />
      );
    }
    case "ico_google": {
      return (
        <Image
          style={{
            width: GS(160),
            height: GS(160),
            ...style,
          }}
          source={require("../images/ico_google.png")}
        />
      );
    }
    case "ico_apple": {
      return (
        <Image
          style={{
            width: GS(160),
            height: GS(160),
            ...style,
          }}
          source={require("../images/ico_apple.png")}
        />
      );
    }
    case "interrogation": {
      return (
        <Image
          style={{
            width: GS(70),
            height: GS(70),
            ...style,
          }}
          source={require("../images/interrogation.png")}
        />
      );
    }
    case "blackbox": {
      return (
        <Image
          style={{
            width: GS(120),
            height: GS(120),
            ...style,
          }}
          source={require("../images/blackbox.png")}
        />
      );
    }
    case "detailview_white": {
      return (
        <Image
          style={{
            width: GS(40),
            height: GS(40),
            ...style,
          }}
          source={require("../images/detailview_white.png")}
        />
      );
    }
    case "component": {
      return (
        <Image
          style={{
            width: GS(120),
            height: GS(120),
            ...style,
          }}
          source={require("../images/component.png")}
        />
      );
    }
    case "breakdown": {
      return (
        <Image
          style={{
            width: GS(120),
            height: GS(120),
            ...style,
          }}
          source={require("../images/breakdown.png")}
        />
      );
    }
    case "alarm": {
      return (
        <Image
          style={{
            width: GS(90),
            height: GS(90),
            ...style,
          }}
          source={require("../images/alarm.png")}
        />
      );
    }
    case "plus": {
      return (
        <Image
          style={{
            width: GS(35),
            height: GS(35),
            ...style,
          }}
          source={require("../images/plus.png")}
        />
      );
    }
    case "main_bg": {
      return (
        <Image
          style={{
            width: GS(1080),
            height: GS(345),
            ...style,
          }}
          source={require("../images/main_bg.png")}
        />
      );
    }
    case "settings": {
      return (
        <Image
          style={{
            width: GS(60),
            height: GS(60),
            ...style,
          }}
          source={require("../images/settings.png")}
        />
      );
    }
    case "checklist": {
      return (
        <Image
          style={{
            width: GS(60),
            height: GS(60),
            ...style,
          }}
          source={require("../images/checklist.png")}
        />
      );
    }
    case "user": {
      return (
        <Image
          style={{
            width: GS(50),
            height: GS(50),
            ...style,
          }}
          source={require("../images/user.png")}
        />
      );
    }
    case "bell": {
      return (
        <Image
          style={{
            width: GS(50),
            height: GS(50),
            ...style,
          }}
          source={require("../images/bell.png")}
        />
      );
    }
    case "prev": {
      return (
        <Image
          style={{
            width: GS(60),
            height: GS(60),
            ...style,
          }}
          source={require("../images/prev.png")}
        />
      );
    }
    case "register_checking": {
      return (
        <Image
          style={{
            width: GS(80),
            height: GS(80),
            ...style,
          }}
          source={require("../images/register_checking.png")}
        />
      );
    }
    case "register_checking_none": {
      return (
        <Image
          style={{
            width: GS(80),
            height: GS(80),
            ...style,
          }}
          source={require("../images/register_checking_none.png")}
        />
      );
    }
    case "check_none": {
      return (
        <Image
          style={{
            width: GS(95),
            height: GS(95),
            ...style,
          }}
          source={require("../images/check_none.png")}
        />
      );
    }
    case "check_ok": {
      return (
        <Image
          style={{
            width: GS(95),
            height: GS(95),
            ...style,
          }}
          source={require("../images/check_ok.png")}
        />
      );
    }
    case "camera": {
      return (
        <Image
          style={{
            width: GS(70),
            height: GS(70),
            ...style,
          }}
          source={require("../images/camera.png")}
        />
      );
    }
    case "delete": {
      return (
        <Image
          style={{
            width: GS(80),
            height: GS(80),
            ...style,
          }}
          source={require("../images/delete.png")}
        />
      );
    }
    case "closed": {
      return (
        <Image
          style={{
            width: GS(60),
            height: GS(60),
            ...style,
          }}
          source={require("../images/closed.png")}
        />
      );
    }
  }
});

export default MyImage;
