import {compact, round, trimEnd} from 'lodash';

import {web3Instance} from '@/blockchain/basic';

export const formatDateTime = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${getLastTwoLetters(day)}/${getLastTwoLetters(
    month,
  )}/${getLastTwoLetters(year)} ${getLastTwoLetters(hour)}:${getLastTwoLetters(
    minute,
  )}`;
};

export const formatLongDateTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${MONTH_NAME[month]} ${getLastTwoLetters(
    day,
  )}, ${year} at ${date.toLocaleTimeString()}`;
};

export const formatLongDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${getLastTwoLetters(day)} ${MONTH_NAME[month]} ${year}`;
};

export const getPartOfDay = (): string => {
  const day = new Date();
  const curHour: number = day.getHours();
  if (curHour >= 5 && curHour < 12) {
    return 'morning';
  }

  if (curHour >= 12 && curHour < 17) {
    return 'afternoon';
  }

  if (curHour >= 17 && curHour < 21) {
    return 'evening';
  }

  return 'night';
};

const MONTH_NAME = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDateWithHyphen = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${MONTH_NAME[month]}-${getLastTwoLetters(day)}`;
};

export const getLastTwoLetters = (value: number): string =>
  `0${value}`.slice(-2);

export const getShortAddress = (address: string, begin = 6, end = 4): string =>
  address.length >= begin + end + 3
    ? `${address.slice(0, begin)}...${address.slice(-end)}`
    : address;

export const formatCurrency = (n: number | string, fixed: number = 2) => {
  const formattedN =
    trimEnd(
      trimEnd(
        round(Number(n), fixed)
          .toFixed(fixed)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        '0',
      ),
      '.',
    ) || '0';
  // Case number dont have fractional part
  if (Number(n) > 999 && formattedN.includes(',') === false) {
    return formattedN.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return formattedN;
};

export const formatETH = (n: number | string | null = '0') => {
  if (n === null) {
    return '0';
  }
  const valueInEther = web3Instance.utils.fromWei(
    String(n).replace(/,/g, '.'),
    'ether',
  );
  return formatCurrency(valueInEther, 8);
};

export const getFullTimeFromSeconds = (value: number): string => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value - hours * 3600) / 60);
  const seconds = value - hours * 3600 - minutes * 60;

  const time = [
    hours ? `${hours}h` : '',
    minutes ? `${minutes}m` : '',
    seconds ? `${seconds}s` : '',
  ];
  return compact(time).join(' ');
};

export const formatWithDelimiter = (s: string): string => {
  if (s.length < 4) {
    return s;
  }
  s = s.replace(/,/g, '');
  return s.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatPricing = (text: string) => {
  let newText = text;
  newText = newText.replace(/,$/, '.');

  const parts = newText.split('.');

  if (parts[1]) {
    newText = formatWithDelimiter(parts[0]) + '.' + parts[1];
  }

  if (parts[0].length > 3 && text.indexOf('.') === -1) {
    newText = formatWithDelimiter(parts[0]);
  }
  return newText;
};

export const getAmountInWei = (
  amount: string, // ether unit
) => web3Instance.utils.toWei(amount.replace(/,/g, '.'), 'wei');

export const convertDecToHex = (chainId: number | string) =>
  typeof chainId === 'number' ? `0x${chainId.toString(16)}` : String(chainId);

export const convertHexToDec = (hex: string) => parseInt(String(hex), 16);

export const kFormatter = (num: number = 0) => {
  return Math.abs(num) > 999
    ? (
        Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1) as any) +
        'k'
      ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : Math.sign(num) * Math.abs(num);
};

export const getViewOnScannerTextByChain = (isPolygonChain?: boolean) =>
  `View on ${isPolygonChain ? 'Polygon scan' : 'BNB Smart Chain Explorer'}`;
