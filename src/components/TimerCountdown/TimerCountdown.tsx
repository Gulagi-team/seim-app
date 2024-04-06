import {deviceWidth} from '@/constants/layout';
import {StoreState, useAppSelector} from '@/store';
import {COLORS, FONT_SIZE, POPPINS_MEDIUM} from '@/theme';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

const CountdownTimer = () => {
  const endDate = useAppSelector(
    (state: StoreState) => state.MiningSlice.miningData.endDate,
  );
  const {borderColor, textOutstandingColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );
  const [timeLeft, setTimeLeft] = useState(endDate - new Date().getTime());

  useEffect(() => {
    // Update the time left every second
    const interval = setInterval(() => {
      setTimeLeft(endDate - new Date().getTime());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  // Helper function to add leading zeros
  const formatNumber = (number: number) => `0${number}`.slice(-2);

  // Convert time left from milliseconds to hours, minutes, and seconds
  const timeRuning = Math.floor(24 * 3600 * 1000 - timeLeft);
  const hours = formatNumber(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = formatNumber(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = formatNumber(Math.floor((timeLeft / 1000) % 60));

  return (
    <View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>
          {(timeRuning / (24 * 3600 * 10)).toFixed(1)}%
        </Text>
        <Text style={{...styles.timerText, color: textOutstandingColor}}>
          {hours}:{minutes}:{seconds}
        </Text>
        {/* <Text style={styles.percentText}>00:00:00</Text> */}
      </View>
      <Progress.Bar
        progress={timeRuning / (24 * 3600 * 100 * 10)}
        width={deviceWidth - 121}
        color={COLORS.primary_A400}
        unfilledColor={borderColor}
        borderWidth={0}
      />
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  levelContainer: {
    width: deviceWidth - 121,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: FONT_SIZE.tiny0,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
    color: COLORS.primary_A500,
  },
  timerText: {
    fontSize: FONT_SIZE.tiny0,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
    color: COLORS.black,
  },
});
