import storage from "../modules/storage";
import { createContext, useContext, useEffect, useReducer } from "react";

export type T_user = {};

export type T_setUser = (newUserState: T_user) => void;

export const initialUser: T_user | null = null;

type T_originUserState = {
  user: T_user | null;
};

type T_setOriginUserState = (userState: T_originUserState) => void;

let initialUserState: T_originUserState = {
  user: initialUser,
};

const newUserState = storage.get<T_originUserState>("userState");
if (newUserState) {
  initialUserState = newUserState;
}

const UserState = createContext(initialUserState);

export function useUser() {
  const Context: any = useContext(UserState);
  const userState: T_originUserState = Context.userState;
  const setUserState: T_setOriginUserState = Context.setUserState;
  const user: T_user | null = userState.user;
  const setUser: T_setUser = (newUser: T_user) => {
    setUserState({
      user: newUser,
    });
  };
  const result = { user, setUser };
  return result;
}

export type T_UserStateContextProps = {
  children: JSX.Element;
};

export const UserContext = ({ children }: T_UserStateContextProps) => {
  const [userState, setUserState] = useReducer(
    (prevUserState: T_originUserState, newUserState: T_originUserState) => {
      return newUserState;
    },
    initialUserState
  );
  const value: any = {
    userState,
    setUserState,
  };

  useEffect(() => {
    const init = () => {
      const newUserState = storage.get<T_originUserState>("userState");
      if (newUserState) {
        setUserState(newUserState);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const setStorage = async () => {
      if (userState.user === initialUser) {
        await storage.remove("userState");
      } else {
        await storage.set("userState", userState);
      }
    };
    setStorage();
  }, [userState]);

  return <UserState.Provider value={value}>{children}</UserState.Provider>;
};
