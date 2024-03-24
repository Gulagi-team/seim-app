import React from 'react';
import {Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ICON_ENERGY from '@/assets/icons/icon_energy.svg';
import POINT_SEIM from '@/assets/images/point_seim.png';
import {styles} from './Point.styles';

const PointContent = () => {
  return (
    <View style={styles.pointContainer}>
      <LinearGradient
        style={styles.rectangleLineargradient}
        locations={[0, 1]}
        colors={['#1B9CFC', '#1DD1A1']}
        useAngle={true}
        angle={180}>
        <ICON_ENERGY />
        <Text style={styles.percentText}>100%</Text>
      </LinearGradient>
      <View style={styles.pointInfoContainer}>
        <View style={styles.pointInfoLeft}>
          <Image
            source={POINT_SEIM}
            style={styles.imagePoint}
            resizeMode={'contain'}
          />
          <View style={styles.pointText}>
            <Text style={styles.totalPointText}>50,002,000 SEIM</Text>
            <Text style={styles.addPointText}>+2,000</Text>
          </View>
        </View>
        <Icon name="navigate-next" size={20} color={'#1B9CFC'} />
      </View>
    </View>
  );
};
export default PointContent;
