import { createContext, useContext, useReducer } from "react";

export type T_appState = {};

export type T_setAppState = (appState: T_appState) => void;

export const initialAppState: T_appState = {};

const AppState = createContext(initialAppState);

export function useAppState() {
  const Context: any = useContext(AppState);
  const appState: T_appState = Context.appState;
  const setAppState: T_setAppState = Context.setAppState;
  const result = { appState, setAppState };
  return result;
}

export type T_AppStateContextProps = {
  children: JSX.Element;
};

export const AppStateContext = ({ children }: T_AppStateContextProps) => {
  const [appState, setAppState] = useReducer(
    (prevAppState: T_appState, newAppState: T_appState) => {
      return newAppState;
    },
    initialAppState
  );
  const value: any = {
    appState,
    setAppState,
  };

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
};
