import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import * as en from './en';
import * as vi from './vi';
import * as cn from './cn';
import * as de from './de';
import * as id from './id';
import * as jp from './jp';
import * as kr from './kr';
import * as ru from './ru';

type TupleUnion<U extends string, R extends unknown[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

const ns = Object.keys(en) as TupleUnion<keyof typeof en>;
export const defaultNS = ns[0];

const DEFAULT_LANGUAGE = 'en';
i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    en: {
      common: en.common,
      screens: en.screens,
      setting: en.setting,
      feedback: en.feedback,
      takePhoto: en.takePhoto,
      carDetail: en.carDetail,
      home: en.home,
      wallet: en.wallet,
      other: en.other,
      mining: en.mining,
      refferal: en.refferal,
      welcome: en.welcome,
    },
    vi: {
      common: vi.common,
      screens: vi.screens,
      setting: vi.setting,
      feedback: vi.feedback,
      takePhoto: vi.takePhoto,
      carDetail: vi.carDetail,
      home: vi.home,
      wallet: vi.wallet,
      other: vi.other,
      mining: vi.mining,
      refferal: vi.refferal,
      welcome: vi.welcome,
    },
    cn: {
      common: cn.common,
      screens: cn.screens,
      setting: cn.setting,
      feedback: cn.feedback,
      takePhoto: cn.takePhoto,
      carDetail: cn.carDetail,
      home: cn.home,
      wallet: cn.wallet,
      other: cn.other,
      mining: cn.mining,
      refferal: cn.refferal,
      welcome: cn.welcome,
    },

    kr: {
      common: kr.common,
      screens: kr.screens,
      setting: kr.setting,
      feedback: kr.feedback,
      takePhoto: kr.takePhoto,
      carDetail: kr.carDetail,
      home: kr.home,
      wallet: kr.wallet,
      other: kr.other,
      mining: kr.mining,
      refferal: kr.refferal,
      welcome: kr.welcome,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18n;
