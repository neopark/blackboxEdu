import React, { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninLayout from "./layouts/SigninLayout";
import SignupLayout from "./layouts/SignupLayout";
import HomeLayout from "./layouts/HomeLayout";
import NoticeLayout from "./layouts/NoticeLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import DeviceSettingsLayout from "./layouts/DeviceSettingsLayout";
import CheckLayout from "./layouts/CheckLayout";
import permission from "./modules/permission";
import fcm from "./modules/fcm";
import notif from "./modules/notif";
import apis, { removeAccessToken, setAccessToken } from "./apis";
import values from "./values";
import storage from "./modules/storage";
import { useToast } from "./contexts/toast";
import { useUser } from "./contexts/user";

const StackNav = createNativeStackNavigator();

function App() {
  const { setToast } = useToast();
  const [routeName, setRouteName] = useState("");
  const { setUser } = useUser();

  const setToken = useCallback(async () => {
    const fcmToken = await fcm.getToken();
    try {
      await apis.notice.setToken({
        fcmToken,
        deviceId: values.device.id,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  const refreshAccessToken = useCallback(async (refreshToken: string) => {
    try {
      const result = await apis.user.refreshAccessToken({
        refreshToken,
      });
      if (result.isSuccess && result.accessToken) {
        return result.accessToken;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    const onMsg = fcm.onMsg(notif.show);
    return () => {
      onMsg.remove();
    };
  }, []);

  useEffect(() => {
    if (routeName === "") {
      const init = async () => {
        await permission.requestNotif();
        await setToken();
        const result: any = await storage.get("refreshToken");
        if (result?.refreshToken) {
          try {
            const accessToken = await refreshAccessToken(result.refreshToken);
            if (accessToken) {
              await setAccessToken(accessToken);
              const getUserResult = await apis.user.get();
              if (!getUserResult.isSuccess) {
                await removeAccessToken();
                await storage.remove("refreshToken");
                setToast({
                  msg: getUserResult.msg,
                });
              } else if (getUserResult.user) {
                setUser(getUserResult.user);
                setRouteName("HomeLayout");
              }
            } else {
              await storage.remove("refreshToken");
              setRouteName("SigninLayout");
              setToast({
                msg: "로그인이 만료되었습니다. 재로그인 부탁드립니다.",
              });
            }
          } catch (err: any) {
            await removeAccessToken();
            await storage.remove("refreshToken");
            setToast({
              msg: err.msg,
            });
            setRouteName("SigninLayout");
          }
        } else {
          setRouteName("SigninLayout");
        }
      };
      init();
    }
  }, [refreshAccessToken, routeName, setToast, setToken, setUser]);

  return (
    <>
      {routeName === "" ? (
        <></>
      ) : (
        <StackNav.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={routeName}
        >
          <StackNav.Screen name="SigninLayout" component={SigninLayout} />
          <StackNav.Screen name="SignupLayout" component={SignupLayout} />
          <StackNav.Screen name="HomeLayout" component={HomeLayout} />
          <StackNav.Screen name="NoticeLayout" component={NoticeLayout} />
          <StackNav.Screen name="SettingsLayout" component={SettingsLayout} />
          <StackNav.Screen name="DeviceSettingsLayout" component={DeviceSettingsLayout} />
          <StackNav.Screen name="CheckLayout" component={CheckLayout} />
        </StackNav.Navigator>
      )}
    </>
  );
}

export default App;
