import React, {memo} from 'react';
import {View} from 'react-native';
import IconProfile from '@/assets/icons/icon_profile.svg';

interface Props {
  style?: any;
}

// The user never picks an avatar (the field stayed empty since the account was
// removed) and the old placeholder pointed at a stranger's photo on the TikTok
// CDN, which an offline app can never load anyway.
const UserAvatar = ({style}: Props) => (
  <View style={[style, {alignItems: 'center', justifyContent: 'center'}]}>
    <IconProfile width="80%" height="80%" />
  </View>
);

export default memo(UserAvatar);
