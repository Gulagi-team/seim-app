import CONST_SCREEN from '@/constants/screen';

const config = {
  screens: {
    Setting: CONST_SCREEN.SETTING,
    Referral: CONST_SCREEN.REFERRAL,
    Feedback: CONST_SCREEN.FEEDBACK,
  },
};

const linking = {
  enabled: 'auto',
  prefixes: ['demo://app'],
};

export default linking;
