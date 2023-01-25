import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import values from "../values";
import { T_fcmMsg } from "./fcm";

export interface T_notif extends FirebaseMessagingTypes.Notification {
  title: string;
  body: string;
  data?: any;
  imageUrl?: string;
}

function show(msg: T_fcmMsg, channelId?: string) {
  const notif: any = {
    color: values.colors.main,
    when: new Date().getTime(),
    title: msg.notif.title,
    showWhen: true,
    vibration: 300,
    visibility: "public",
    priority: "high",
    importance: "high",
    largeIcon: "",
    smallIcon: `${values.app.type}_ic_launcher`,
    message: msg.notif.body,
    userInfo: msg.data,
    messageId: msg.messageId,
    channelId: channelId || "general",
    largeIconUrl: msg.notif.imageUrl,
    bigPictureUrl: msg.notif.imageUrl,
  };
  PushNotification.localNotification(notif);
}

function cancelAll() {
  PushNotification.removeAllDeliveredNotifications();
}

const notif = {
  show,
  cancelAll,
};

export default notif;
