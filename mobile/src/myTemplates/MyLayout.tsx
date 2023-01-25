import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { initialLoading, useLoading } from "../contexts/loading";

export type T_MyLayoutProps = {
  children: JSX.Element[];
};

function MyLayout({ children }: T_MyLayoutProps) {
  const isFocus = useIsFocused();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (isFocus) {
      return () => {
        //
      };
    }
  }, [isFocus, setLoading]);

  return <>{children}</>;
}

export default MyLayout;
