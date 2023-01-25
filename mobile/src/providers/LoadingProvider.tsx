import React from "react";
import { initialLoading, useLoading } from "../contexts/loading";
import MyLoading from "../myComponents/MyLoading";
import MyView from "../myComponents/MyView";
import { GS } from "../styles/sizes";
import values from "../values";

export type T_LoadingProviderProps = {
  children: JSX.Element;
};

function LoadingProvider({ children }: T_LoadingProviderProps) {
  const { loading } = useLoading();

  return (
    <>
      {children}
      <MyView
        pointerEvents="none"
        style={{
          top: GS(0),
          left: GS(0),
          width: values.device.width,
          height: values.device.height,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading !== initialLoading && <MyLoading />}
      </MyView>
    </>
  );
}

export default LoadingProvider;
