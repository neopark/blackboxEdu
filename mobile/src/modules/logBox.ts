import { LogBox } from "react-native";

export function initLogBox() {
  LogBox.ignoreLogs([
    // #MEMO, #MODULE: react-native-qrcode-scanner
    // #ADD:
    `ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.`,
    //
    // #MEMO, #MODULE: @react-navigation/native
    // #ADD:
    `Non-serializable values were found in the navigation state. Check:`,
    //
    // #MEMO, #MODULE: react-native-reanimated
    // #ADD:
    "Sending `onReanimatedPropsChange` with no listeners registered.",
    //
    // #MEMO, #MODULE: react-native-bluetooth-serial-next
    // #ADD:
    "EventEmitter.removeSubscription(...): Method has been deprecated. Please instead use `remove()` on the subscription itself.",
    //
  ]);
}
