import React from "react";
import { AlertContext } from "./alert";
import { AppStateContext } from "./appState";
import { CheckStateListContext } from "./checkStateList";
import { LoadingContext } from "./loading";
import { ToastContext } from "./toast";
import { UserContext } from "./user";

export type T_ContextsProps = {
  children: JSX.Element;
};

function Contexts({ children }: T_ContextsProps) {
  return (
    <AppStateContext>
      <UserContext>
        <CheckStateListContext>
          <ToastContext>
            <LoadingContext>
              <AlertContext>{children}</AlertContext>
            </LoadingContext>
          </ToastContext>
        </CheckStateListContext>
      </UserContext>
    </AppStateContext>
  );
}

export default Contexts;
