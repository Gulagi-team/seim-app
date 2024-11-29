import {deviceWidth} from '@/constants/layout';
import {StoreState, useAppSelector} from '@/store';
import {COLORS, FONT_SIZE, POPPINS_MEDIUM} from '@/theme';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

const CountdownTimer = ({endDate = 0, startDate = 0}) => {
  // const endDate = useAppSelector(
  //   (state: StoreState) => state.MiningSlice.miningData.endDate,
  // );
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

  // Calculate timeRuning dynamically
  const elapsedTime = new Date().getTime() - new Date(startDate).getTime(); // Elapsed time in milliseconds
  const totalTime = new Date(endDate).getTime() - new Date(startDate).getTime(); // Total mining duration in milliseconds

  const timeRuning = Math.min(elapsedTime / totalTime, 1) * 100; // Percentage of time completed

  // Convert remaining time to hours, minutes, and seconds
  const hours = formatNumber(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = formatNumber(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = formatNumber(Math.floor((timeLeft / 1000) % 60));

  return (
    <View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>
          {startDate === 0 ? '0.0%' : timeRuning.toFixed(1) + '%'}
        </Text>
        <Text style={{...styles.timerText, color: textOutstandingColor}}>
          {startDate !== 0 && (
            <>
              {hours}:{minutes}:{seconds}
            </>
          )}
        </Text>
      </View>
      <Progress.Bar
        progress={timeRuning / 100} // Normalized to 0–1 for progress bar
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
