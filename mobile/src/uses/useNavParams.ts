import { useRoute } from "@react-navigation/native";

export type T_navParams = {
  [name: string]: any;
};

function useNavParams() {
  const location = useRoute();
  const params = location.params as T_navParams;
  return params;
}

export default useNavParams;
