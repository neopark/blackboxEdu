import AsyncStorage from "@react-native-async-storage/async-storage";

export type T_storageKey = "accessToken" | "refreshToken" | "appState" | "checkState";

export type T_storageValueObj = {
  [name: string]: any;
};

export type T_storageValue = T_storageValueObj;

async function get<T = T_storageValue>(key: T_storageKey): Promise<T | null> {
  const result = await AsyncStorage.getItem(`@${key}`);
  const value = result ? JSON.parse(result) : null;
  return value;
}

async function set(key: T_storageKey, value: T_storageValue) {
  await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
}

async function remove(key: T_storageKey) {
  await AsyncStorage.removeItem(`@${key}`);
}

const storage = {
  get,
  set,
  remove,
};

export default storage;
