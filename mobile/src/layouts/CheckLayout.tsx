import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexLayout from "./check/IndexLayout";
import DetailLayout from "./check/DetailLayout";

const StackNav = createNativeStackNavigator();

function CheckLayout() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen name="IndexLayout" component={IndexLayout} />
      <StackNav.Screen name="DetailLayout" component={DetailLayout} />
    </StackNav.Navigator>
  );
}

export default CheckLayout;
