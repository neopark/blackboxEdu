import Config from "react-native-config";
import {
  getApplicationName,
  getBuildNumber,
  getBundleId,
  getVersion,
} from "react-native-device-info";

export type T_appType = "basic" | "pro";

export const appType = Config.TYPE as T_appType;

const app = {
  name: getApplicationName(),
  type: appType,
  isDebug: process.env.NODE_ENV === "development",
  packageName: getBundleId(),
  version: {
    name: getVersion(),
    code: getBuildNumber(),
  },
};

export default app;
