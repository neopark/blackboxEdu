import { useCallback } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { T_navParams } from "./useNavParams";

function useNav() {
  const nav = useNavigation();

  const push = useCallback(
    (name: string, params?: T_navParams) => {
      nav.dispatch(StackActions.push(name, params));
    },
    [nav]
  );

  const reset = useCallback(
    (name: string, params?: T_navParams) => {
      const newReset = nav.reset as any;
      const state = {
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      };
      newReset(state);
    },
    [nav]
  );

  const navigate = useCallback(
    (name: string, params?: T_navParams) => {
      const newNavigate = nav.navigate as any;
      newNavigate(name, params);
    },
    [nav]
  );

  return {
    ...nav,
    push,
    reset,
    navigate,
  };
}

export default useNav;
