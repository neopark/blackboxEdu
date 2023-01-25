import React, { createContext, useContext, useReducer } from "react";

export type T_toast = {
  msg: string;
  bottom?: number;
};

export type T_setToast = (toast: T_toast) => void;

export const initialToast: T_toast = {
  msg: "",
};

const Toast = createContext(initialToast);

export function useToast() {
  const Context: any = useContext(Toast);
  const toast: T_toast = Context.toast;
  const setToast: T_setToast = Context.setToast;
  const result = { toast, setToast };
  return result;
}

export type T_ToastContextProps = {
  children: JSX.Element;
};

export const ToastContext = ({ children }: T_ToastContextProps) => {
  const [toast, setToast] = useReducer((prevToast: T_toast, newToast: T_toast) => {
    return newToast;
  }, initialToast);
  const value: any = {
    toast,
    setToast,
  };

  return <Toast.Provider value={value}>{children}</Toast.Provider>;
};
