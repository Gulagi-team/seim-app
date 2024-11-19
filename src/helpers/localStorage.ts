import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const getStringLocal = (key: string) => {
  try {
    return storage.getString(key);
  } catch (error) {
    console.log('Get string error', error);
  }
};

const getBooleanLocal = (key: string) => {
  try {
    return storage.getBoolean(key);
  } catch (error) {
    console.log('Get boolean error', error);
  }
};

export {getStringLocal, getBooleanLocal};
