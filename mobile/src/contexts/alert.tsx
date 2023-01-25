import React, { createContext, useContext, useReducer } from "react";

export type T_alertButton = {
  text: string;
  color?: string;
  onPress?: () => void;
};

export type T_alert = {
  msg: string;
  onHide?: () => void;
  buttonList?: T_alertButton[];
};

export type T_setAlert = (alert: T_alert) => void;

export const initialAlert: T_alert = {
  msg: "",
};

const Alert = createContext(initialAlert);

export function useAlert() {
  const Context: any = useContext(Alert);
  const alert: T_alert = Context.alert;
  const setAlert: T_setAlert = Context.setAlert;
  const result = { alert, setAlert };
  return result;
}

export type T_AlertContextProps = {
  children: JSX.Element;
};

export const AlertContext = ({ children }: T_AlertContextProps) => {
  const [alert, setAlert] = useReducer((prevAlert: T_alert, newAlert: T_alert) => {
    return newAlert;
  }, initialAlert);
  const value: any = {
    alert,
    setAlert,
  };

  return <Alert.Provider value={value}>{children}</Alert.Provider>;
};
