import React, { createContext, useContext, useReducer } from "react";

export type T_loading = string;

export type T_setLoading = (loading: T_loading) => void;

export const initialLoading: T_loading = "";

const Loading = createContext(initialLoading);

export function useLoading() {
  const Context: any = useContext(Loading);
  const loading: T_loading = Context.loading;
  const setLoading: T_setLoading = Context.setLoading;
  const result = { loading, setLoading };
  return result;
}

export type T_LoadingContextProps = {
  children: JSX.Element;
};

export const LoadingContext = ({ children }: T_LoadingContextProps) => {
  const [loading, setLoading] = useReducer((prevLoading: T_loading, newLoading: T_loading) => {
    return newLoading;
  }, initialLoading);
  const value: any = {
    loading,
    setLoading,
  };

  return <Loading.Provider value={value}>{children}</Loading.Provider>;
};
