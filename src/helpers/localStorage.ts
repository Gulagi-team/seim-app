import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const getStringLocal = (key: string) => {
  try {
    return storage.getString(key);
  } catch (error) {
    console.log("Get string error", error);
  }
};

const getBooleanLocal = (key: string) => {
  try {
    return storage.getBoolean(key);
  } catch (error) {
    console.log("Get boolean error", error);
  }
};

const setStringLocal = (key: string, value: string) => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.log("Set string error", error);
  }
};

const getJSONLocal = <T>(key: string): T | null => {
  const raw = getStringLocal(key);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.log("Parse json error", error);
    return null;
  }
};

const setJSONLocal = (key: string, value: unknown) => {
  setStringLocal(key, JSON.stringify(value));
};

export { getStringLocal, getBooleanLocal, setStringLocal, getJSONLocal, setJSONLocal };
