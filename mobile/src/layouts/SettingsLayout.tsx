import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexLayout from "./settings/IndexLayout";
import ProfileLayout from "./settings/ProfileLayout";
import CheckListLayout from "./settings/CheckListLayout";
import CheckDetailLayout from "./settings/CheckDetailLayout";
import SnsSettingsLayout from "./settings/SnsSettingsLayout";
import PartChangeLayout from "./settings/PartChangeLayout";
import TroubleshootingLayout from "./settings/TroubleshootingLayout";

const StackNav = createNativeStackNavigator();

function SettingsLayout() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen name="IndexLayout" component={IndexLayout} />
      <StackNav.Screen name="ProfileLayout" component={ProfileLayout} />
      <StackNav.Screen name="CheckListLayout" component={CheckListLayout} />
      <StackNav.Screen name="CheckDetailLayout" component={CheckDetailLayout} />
      <StackNav.Screen name="SnsSettingsLayout" component={SnsSettingsLayout} />
      <StackNav.Screen name="TroubleshootingLayout" component={TroubleshootingLayout} />
      <StackNav.Screen name="PartChangeLayout" component={PartChangeLayout} />
    </StackNav.Navigator>
  );
}

export default SettingsLayout;
