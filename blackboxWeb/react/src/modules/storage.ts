export type T_storageKey = string;

export type T_storageValueObj = {
  [name: string]: any;
};

export type T_storageValue = T_storageValueObj;

function get<T = T_storageValue>(key: T_storageKey): T | null {
  const result = localStorage.getItem(`@${key}`);
  const value = result ? JSON.parse(result) : null;
  return value;
}

function set(key: T_storageKey, value: T_storageValue) {
  localStorage.setItem(`@${key}`, JSON.stringify(value));
}

function remove(key: T_storageKey) {
  localStorage.removeItem(`@${key}`);
}

const storage = {
  get,
  set,
  remove,
};

export default storage;
