import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import MyIcon, { T_MyIconName } from "../myComponents/MyIcon";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import useNav from "../uses/useNav";
import { GS } from "../styles/sizes";
import values from "../values";
import ExamplePageDrawer from "./drawer/ExamplePageDrawer";

const DrawerNav = createDrawerNavigator();

type T_drawer = {
  key: string;
  text: string;
  name: string;
  iconName: T_MyIconName;
  component: () => JSX.Element;
};

const drawerList: T_drawer[] = [
  {
    key: "ExampleHomeDrawer",
    text: "Home",
    name: "ExampleHomeDrawer",
    iconName: "home",
    component: ExamplePageDrawer,
  },
  {
    key: "ExampleCreditcardDrawer",
    text: "Creditcard",
    name: "ExampleCreditcardDrawer",
    iconName: "creditcard",
    component: ExamplePageDrawer,
  },
  {
    key: "ExampleCodesquareoDrawer",
    text: "Codesquareo",
    name: "ExampleCodesquareoDrawer",
    iconName: "codesquareo",
    component: ExamplePageDrawer,
  },
  {
    key: "ExampleBookDrawer",
    text: "Book",
    name: "ExampleBookDrawer",
    iconName: "book",
    component: ExamplePageDrawer,
  },
  {
    key: "ExampleBarschartDrawer",
    text: "Barschart",
    name: "ExampleBarschartDrawer",
    iconName: "barschart",
    component: ExamplePageDrawer,
  },
];

function ExampleDrawerLayout() {
  const nav = useNav();

  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <MyView
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
            }}
          >
            <MyView
              style={{
                height: GS(130) + values.device.statusBarHeight,
                backgroundColor: values.colors.blue,
              }}
            />
            <MyView
              style={{
                height: GS(10),
              }}
            />
            {drawerList.map((drawer, idx) => {
              let color = "#888888";
              if (idx === props.state.index) {
                color = values.colors.blue;
              }

              return (
                <MyTouch
                  disabled={idx === props.state.index}
                  onPress={() => {
                    nav.navigate(drawer.name);
                  }}
                  style={{
                    height: GS(50),
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: GS(20),
                  }}
                  key={drawer.name}
                >
                  <MyIcon color={color} size={GS(20)} name={drawer.iconName} />
                  <MyText
                    font="nsm"
                    style={{
                      color,
                      marginLeft: GS(20),
                    }}
                  >
                    {drawer.text}
                  </MyText>
                </MyTouch>
              );
            })}
          </MyView>
        );
      }}
    >
      {drawerList.map((drawer) => {
        return (
          <DrawerNav.Screen
            {...drawer}
            initialParams={{
              title: drawer.text,
            }}
          />
        );
      })}
    </DrawerNav.Navigator>
  );
}

export default ExampleDrawerLayout;
