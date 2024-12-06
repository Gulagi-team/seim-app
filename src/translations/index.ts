import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import * as en from './en';
import * as vi from './vi';
import * as cn from './cn';
import * as kr from './kr';

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
      setting: en.setting,
      feedback: en.feedback,
      home: en.home,
      wallet: en.wallet,
      other: en.other,
      mining: en.mining,
      welcome: en.welcome,
      referral: en.referral,
    },
    vi: {
      setting: vi.setting,
      feedback: vi.feedback,
      home: vi.home,
      wallet: vi.wallet,
      other: vi.other,
      mining: vi.mining,
      welcome: vi.welcome,
      referral: vi.referral,
    },
    cn: {
      setting: cn.setting,
      feedback: cn.feedback,
      home: cn.home,
      wallet: cn.wallet,
      other: cn.other,
      mining: cn.mining,
      welcome: cn.welcome,
      referral: cn.referral,
    },

    kr: {
      setting: kr.setting,
      feedback: kr.feedback,
      home: kr.home,
      wallet: kr.wallet,
      other: kr.other,
      mining: kr.mining,
      welcome: kr.welcome,
      referral: kr.referral,
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
