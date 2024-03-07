import Toast from 'react-native-toast-message';

interface Options {
  width?: number;
  onPress?: () => void;
  visibilityTime?: number;
}

export const showToast = (
  type: 'error' | 'success' | 'info',
  message: string,
  options?: Options,
) =>
  message &&
  Toast.show({
    type,
    props: {
      message,
      ...options,
    },
    autoHide: true,
    topOffset: 40,
    visibilityTime: options?.visibilityTime || 3000,
  });

export const getErrorMessage = (err: any, defaultMessage?: string) => {
  console.log('getErrorMessage', err);
  return (
    (typeof err?.data?.data?.errors === 'string'
      ? err?.data?.data?.errors
      : err?.data?.data?.errors?.[0]) ||
    err?.data?.message ||
    err?.message ||
    defaultMessage ||
    'Some error happens. Please try again later.'
  );
};
