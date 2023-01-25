import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useNav() {
  const nav = useNavigate();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const goBack = useCallback(() => {
    nav(-1);
  }, [nav]);

  const replace = useCallback(
    (string) => {
      nav(string, {
        replace: true,
      });
    },
    [nav]
  );

  const push = useCallback(
    (string) => {
      nav(string);
    },
    [nav]
  );
  const pushParam = useCallback(
    (string,params) => {
      nav(string,{state:params});
    },
    [nav]
  );

  return {
    ...nav,
    ...location,
    push,
    params,
    goBack,
    replace,
    pushParam,
  };
}

export default useNav;
