import Config from "react-native-config";
import permissions, { openSettings, Permission, PermissionStatus } from "react-native-permissions";
import values from "../values";

export type T_permissionType =
  | "CAMERA"
  | "ACCESS_FINE_LOCATION"
  | "LOCATION_WHEN_IN_USE"
  | "BLUETOOTH_PERIPHERAL";

export type T_permissionStatus = PermissionStatus;

const requestMsgs = {
  location: Config.REQUEST_LOCATION_PERMISSION_MSG,
  camera: Config.REQUEST_CAMERA_PERMISSION_MSG,
  bluetooth: Config.REQUEST_BLUETOOTH_PERMISSION_MSG,
};

async function requestPermission(type: T_permissionType) {
  const os = values.device.isIos ? "ios" : "android";
  const newType = type.toUpperCase();
  const permission = `${os}.permission.${newType}` as Permission;
  const status = await permissions.request(permission);
  return status;
}

async function requestCamera() {
  let msg = "";
  const status = await requestPermission("CAMERA");
  switch (status) {
    case "unavailable": {
      msg = "해당 디바이스는 카메라 기능을 지원하지 않습니다.";
      break;
    }
    case "denied":
    case "blocked": {
      msg = `${requestMsgs.camera} 앱 설정 화면으로 이동해 카메라 사용 권한을 변경하시겠습니까?`;
      break;
    }
    case "limited":
    case "granted": {
      msg = "success";
    }
  }
  return msg;
}

async function requestNotif() {
  const result = await permissions.requestNotifications(["alert", "badge", "sound"]);
  let msg = "";
  switch (result.status) {
    case "unavailable": {
      msg = "해당 디바이스는 알림 기능을 지원하지 않습니다.";
      break;
    }
    case "denied":
    case "blocked": {
      msg = "현재 알림 비활성 상태입니다.";
      break;
    }
    case "limited":
    case "granted": {
      msg = "success";
    }
  }
  return msg;
}

async function requestBluetooth() {
  let msg = "";
  const status = await requestPermission("BLUETOOTH_PERIPHERAL");
  switch (status) {
    case "unavailable": {
      msg = "해당 디바이스는 Bluetooth 기능을 지원하지 않습니다.";
      break;
    }
    case "denied":
    case "blocked": {
      msg = `${requestMsgs.bluetooth} 앱 설정 화면으로 이동해 Bluetooth 사용 권한을 변경하시겠습니까?`;
      break;
    }
    case "limited":
    case "granted": {
      msg = "success";
    }
  }
  return msg;
}

async function requestLocation() {
  let msg = "";
  const status = await requestPermission("ACCESS_FINE_LOCATION");
  switch (status) {
    case "unavailable": {
      msg = "해당 디바이스는 위치 기능을 지원하지 않습니다.";
      break;
    }
    case "denied":
    case "blocked": {
      msg = `${requestMsgs.location} 앱 설정 화면으로 이동해 위치 사용 권한을 변경하시겠습니까?`;
      break;
    }
    case "limited":
    case "granted": {
      msg = "success";
    }
  }
  return msg;
}

const permission = {
  openSettings,
  requestCamera,
  requestNotif,
  requestBluetooth,
  requestMsgs,
  requestLocation,
};

export default permission;
