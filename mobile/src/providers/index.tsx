import React from "react";
import AlertProvider from "./AlertProvider";
import LoadingProvider from "./LoadingProvider";
import ToastProvider from "./ToastProvider";

export type T_ProvidersProps = {
  children: JSX.Element;
};

function Providers({ children }: T_ProvidersProps) {
  return (
    <ToastProvider>
      <LoadingProvider>
        <AlertProvider>{children}</AlertProvider>
      </LoadingProvider>
    </ToastProvider>
  );
}

export default Providers;
