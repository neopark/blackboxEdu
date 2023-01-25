// #MEMO, #MODULE: react-native-gesture-handler
// #ADD:
import "react-native-gesture-handler";
//
import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";
import { initApis } from "./apis";
import { initFcm } from "./modules/fcm";
import { initSnss } from "./modules/snss";
import { initLogBox } from "./modules/logBox";
import Providers from "./providers";
import Contexts from "./contexts";
import { initCalendarPicker } from "./myComponents/MyCalendarPicker";

function Run() {
  initFcm();
  initSnss();
  initLogBox();
  initApis();
  initCalendarPicker();
  AppRegistry.registerComponent("app", () => () => {
    return (
      <NavigationContainer>
        <Contexts>
          <Providers>
            <App />
          </Providers>
        </Contexts>
      </NavigationContainer>
    );
  });
}

Run();
