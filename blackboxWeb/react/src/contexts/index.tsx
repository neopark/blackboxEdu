import { AppStateContext } from "./appState";
import { UserContext } from "./user";

export type T_ContextsProps = {
  children: JSX.Element;
};

function Contexts({ children }: T_ContextsProps) {
  return (
    <AppStateContext>
      <UserContext>{children}</UserContext>
    </AppStateContext>
  );
}

export default Contexts;
