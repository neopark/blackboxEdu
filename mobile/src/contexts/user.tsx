import React, { createContext, useContext, useReducer } from "react";

export type T_user = {
  id: string;
  name: string;
  snsType: string;
  bizName: string;
  phoneNum: string;
  bizNum: string;
  appleId: string;
  googleId: string;
  kakaoId: string;
  naverId: string;
};

export type T_setUser = (user: T_user | null) => void;

export const initialUser: T_user | null = null;

const User = createContext(initialUser);

export function useUser() {
  const Context: any = useContext(User);
  const user: T_user = Context.user;
  const setUser: T_setUser = Context.setUser;
  const result = { user, setUser };
  return result;
}

export type T_UserContextProps = {
  children: JSX.Element;
};

export const UserContext = ({ children }: T_UserContextProps) => {
  const [user, setUser] = useReducer((prevUser: T_user | null, newUser: T_user | null) => {
    return newUser;
  }, initialUser);
  const value: any = {
    user,
    setUser,
  };

  return <User.Provider value={value}>{children}</User.Provider>;
};
