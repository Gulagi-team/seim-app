const config = {
  screens: {
    MAIN_SCREEN: 'main',
    REFERRAL_SCREEN: 'referral',
  },
};

const linking = {
  enabled: true,
  prefixes: ['seim://app'],
  config,
  fallback: 'MAIN_SCREEN',
};
export default linking;
