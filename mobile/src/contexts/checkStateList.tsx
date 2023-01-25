import React, { createContext, useContext, useEffect, useReducer } from "react";
import { T_check, T_checkDetail } from "../apis/check";
import storage from "../modules/storage";

export type T_checkDetailType = "b" | "c" | "except";

export type T_checkDetailState = {
  type: T_checkDetailType | null;
} & T_checkDetail;

export type T_checkState = {
  isFold: boolean;
  detailList: T_checkDetailState[] | null;
} & T_check;

export type T_setCheckState = (newCheckState: T_checkState) => void;

export type T_setCheckStateList = (checkStateList: T_checkState[]) => void;

export const initialCheckStateList: T_checkState[] = [];

type T_originCheckState = {
  list: T_checkState[];
};

type T_setOriginCheckState = (checkState: T_originCheckState) => void;

const initialCheckState: T_originCheckState = {
  list: initialCheckStateList,
};

const CheckState = createContext(initialCheckState);

export function useCheckStateList() {
  const Context: any = useContext(CheckState);
  const checkState: T_originCheckState = Context.checkState;
  const setCheckState: T_setOriginCheckState = Context.setCheckState;
  const checkStateList: T_checkState[] = checkState.list;
  const setCheckStateList: T_setCheckStateList = (newCheckStateList: T_checkState[]) => {
    setCheckState({
      list: newCheckStateList,
    });
  };
  const result = { checkStateList, setCheckStateList };
  return result;
}

export type T_CheckStateContextProps = {
  children: JSX.Element;
};

export const CheckStateListContext = ({ children }: T_CheckStateContextProps) => {
  const [checkState, setCheckState] = useReducer(
    (prevCheckState: T_originCheckState, newCheckState: T_originCheckState) => {
      return newCheckState;
    },
    initialCheckState
  );
  const value: any = {
    checkState,
    setCheckState,
  };

  useEffect(() => {
    const init = async () => {
      const newCheckState = await storage.get<T_originCheckState>("checkState");
      if (newCheckState) {
        setCheckState(newCheckState);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const setStorage = async () => {
      if (checkState.list === initialCheckStateList) {
        await storage.remove("checkState");
      } else {
        await storage.set("checkState", checkState);
      }
    };
    setStorage();
  }, [checkState]);

  return <CheckState.Provider value={value}>{children}</CheckState.Provider>;
};
