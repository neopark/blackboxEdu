import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";
import { T_notif } from "./notif";

export interface T_fcmMsg extends FirebaseMessagingTypes.RemoteMessage {
  notif: T_notif;
}

export function initFcm() {
  const channel = {
    channelId: "general",
    channelName: "일반",
    importance: Importance.HIGH,
  };
  PushNotification.createChannel(channel, () => undefined);
  messaging().setBackgroundMessageHandler(async () => undefined);
}

function formatMsg(msg: FirebaseMessagingTypes.RemoteMessage) {
  let fcmMsg: T_fcmMsg | null = null;
  if (msg.notification && msg.notification.title && msg.notification.body) {
    fcmMsg = {
      ...msg,
      notif: {
        ...msg.notification,
        body: msg.notification.body,
        title: msg.notification.title,
        imageUrl: msg.notification.android?.imageUrl,
      },
    };
  }
  return fcmMsg;
}

async function getToken() {
  const token = messaging().getToken();
  return token;
}

function onMsg(callback: (msg: T_fcmMsg) => void) {
  const onMsgEvt = messaging().onMessage(async (msg) => {
    const fcmMsg = formatMsg(msg);
    if (fcmMsg) {
      callback(fcmMsg);
    }
  });
  const remove = onMsgEvt;
  return {
    remove,
  };
}

function onMsgPress(callback: () => void) {
  PushNotification.configure({
    onNotification: (msg) => {
      const action = "com.apple.UNNotificationDefaultActionIdentifier";
      if ((msg.action === action || msg.userInteraction) && msg.foreground) {
        callback();
      }
    },
  });
}

async function onInit() {
  const msg = await messaging().getInitialNotification();
  let fcmMsg: T_fcmMsg | null = null;
  if (msg) {
    fcmMsg = formatMsg(msg);
  }
  return fcmMsg;
}

const fcm = {
  getToken,
  onMsg,
  onMsgPress,
  onInit,
};

export default fcm;
