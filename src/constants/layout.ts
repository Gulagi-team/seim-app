import {Dimensions, Platform} from 'react-native';
// import { hasNotch } from 'react-native-device-info';

import {STATUS_BAR_HEIGHT} from './status-bar';

export const {
  width: deviceWidth,
  height: deviceHeight,
  scale,
} = Dimensions.get('screen');

export const {width: windowWidth, height: windowHeight} =
  Dimensions.get('window');

export const LAYOUT_CONTENT_HEIGHT = Platform.select({
  ios: windowHeight,
  android: windowHeight - STATUS_BAR_HEIGHT,
  default: windowHeight,
});

export const STAR_DETAIL_MAX_HEIGHT = (660 * scale) / 2;

export const isDeviceHeightTooShort =
  LAYOUT_CONTENT_HEIGHT < STAR_DETAIL_MAX_HEIGHT;
export const isDeviceHeightScaleTooLong = deviceHeight / deviceWidth > 1.9;

const calcScale = STAR_DETAIL_MAX_HEIGHT / LAYOUT_CONTENT_HEIGHT;
const reScale = calcScale > 1 ? 1 / calcScale : calcScale;
export const STAR_3D_SCALE =
  (isDeviceHeightScaleTooLong || isDeviceHeightTooShort) && reScale < 1
    ? reScale
    : 1;

// export const HAS_NOTCH = Platform.OS === 'ios' ? hasNotch() : false;

// export const TAB_BAR_HEIGHT = HAS_NOTCH ? 84 : 66;

export const NAV_BAR_HEIGHT = deviceHeight - windowHeight - STATUS_BAR_HEIGHT;

export const STAR_SWIPABLE_VIEW_HEIGHT = Math.max(deviceHeight * 0.25, 210);
export const STAR_SWIPABLE_VIEW_WIDTH = 260;
