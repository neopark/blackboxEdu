import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MyIcon, { T_MyIconName } from "../myComponents/MyIcon";
import MyText from "../myComponents/MyText";
import MyTouch from "../myComponents/MyTouch";
import MyView from "../myComponents/MyView";
import useNav from "../uses/useNav";
import { GS } from "../styles/sizes";
import values from "../values";
import ExamplePageTab from "./tab/ExamplePageTab";

const TabNav = createBottomTabNavigator();

type T_tab = {
  key: string;
  text: string;
  name: string;
  iconName: T_MyIconName;
  component: () => JSX.Element;
};

const tabList: T_tab[] = [
  {
    key: "ExampleHomeTab",
    text: "Home",
    name: "ExampleHomeTab",
    iconName: "home",
    component: ExamplePageTab,
  },
  {
    key: "ExampleCreditcardTab",
    text: "Creditcard",
    name: "ExampleCreditcardTab",
    iconName: "creditcard",
    component: ExamplePageTab,
  },
  {
    key: "ExampleCodesquareoTab",
    text: "Codesquareo",
    name: "ExampleCodesquareoTab",
    iconName: "codesquareo",
    component: ExamplePageTab,
  },
  {
    key: "ExampleBookTab",
    text: "Book",
    name: "ExampleBookTab",
    iconName: "book",
    component: ExamplePageTab,
  },
  {
    key: "ExampleBarschartTab",
    text: "Barschart",
    name: "ExampleBarschartTab",
    iconName: "barschart",
    component: ExamplePageTab,
  },
];

function ExampleTabLayout() {
  const nav = useNav();

  return (
    <TabNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        return (
          <MyView
            style={{
              height: values.device.tabHeight + values.device.bottomSpaceHeight - GS(1),
              borderTopWidth: GS(1),
              backgroundColor: "#ffffff",
            }}
          >
            <MyView
              style={{
                flexDirection: "row",
              }}
            >
              {tabList.map((tab, idx) => {
                let color = "#888888";
                if (idx === props.state.index) {
                  color = values.colors.blue;
                }

                return (
                  <MyTouch
                    disabled={idx === props.state.index}
                    onPress={() => {
                      nav.navigate(tab.name);
                    }}
                    style={{
                      flex: 1,
                      height: values.device.tabHeight,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={tab.name}
                  >
                    <MyIcon color={color} size={GS(20)} name={tab.iconName} />
                    <MyText
                      font="nsm"
                      style={{
                        color,
                        fontSize: GS(10),
                      }}
                    >
                      {tab.text}
                    </MyText>
                  </MyTouch>
                );
              })}
            </MyView>
          </MyView>
        );
      }}
    >
      {tabList.map((tab) => {
        return (
          <TabNav.Screen
            {...tab}
            initialParams={{
              title: tab.text,
            }}
          />
        );
      })}
    </TabNav.Navigator>
  );
}

export default ExampleTabLayout;
