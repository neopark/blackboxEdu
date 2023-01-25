import { useCallback } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";

function useNavDrawer() {
  const nav = useNavigation();

  const openDrawer = useCallback(() => {
    nav.dispatch(DrawerActions.openDrawer);
  }, [nav]);

  const closeDrawer = useCallback(() => {
    nav.dispatch(DrawerActions.closeDrawer);
  }, [nav]);

  const toggleDrawer = useCallback(() => {
    nav.dispatch(DrawerActions.toggleDrawer);
  }, [nav]);

  return {
    ...nav,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}

export default useNavDrawer;
