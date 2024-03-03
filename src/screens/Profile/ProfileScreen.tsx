import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {LessionType} from '@/types/colection';
import PackItem from '@/components/listItem/PackItem';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import {fetchLessions} from '@/store/lessions';
import {navigate} from '@/helpers/navigation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Spinner} from '@gluestack-ui/themed';
import {styles} from './ProfileScreen.styles';
import {LinearGradient} from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import IconBarChart from '@/assets/icons/icon_bar_chart.svg';
import Header from '@/components/Header';

const ProfileScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;

  const [loading, setLoading] = useState(true);
  // const [lessions, setLessions] = useState<LessionType[]>([]);

  const {lessions, lessionsSelected, status, keyLessionSelected} =
    useAppSelector((state: StoreState) => state.LessionSlice);

  useEffect(() => {
    dispatch(fetchLessions());
  }, []);

  //------

  return (
    <SafeAreaView style={styles.container}>
      <Header
        renderLogo
        // canGoBack={!(idxContent === 0)}
        // handleGoBack={() => ()}
      />
      <ScrollView style={styles.scrollviewContainer}>
        <LinearGradient
          style={styles.rectangleLineargradient}
          locations={[0, 1]}
          colors={['#47A0FF', '#1165BE']}
          useAngle={true}
          angle={180}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: 'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/a6f08bb5d661b2839f5be9f2fb755f47.jpeg',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>Thanh Tung</Text>

            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level.2</Text>
              <Text style={styles.levelText}>115/500</Text>
            </View>
            <Progress.Bar
              progress={0.7}
              width={157}
              color="#fff"
              unfilledColor="#16589D"
              borderWidth={0}
            />
          </View>
        </LinearGradient>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.bmiContainer}>
              <Text style={styles.infoText}>Age: 21</Text>
              <Text style={styles.infoText}>BMI: 23,15</Text>
            </View>
            <View style={styles.bmiContainer}>
              <Text style={styles.infoText}>Height: 175</Text>
              <Text style={styles.infoText}>Weight: 70</Text>
            </View>
          </View>

          <View style={styles.processingContainer}>
            <View style={styles.processingTitleContainer}>
              <View style={styles.iconContainer}>
                <IconBarChart />
                <Text style={styles.processingText}>Processing</Text>
              </View>
              <Text style={styles.seeAllText}>See all</Text>
            </View>
            <View style={styles.physicalContainer}>
              <View style={styles.physicalConatiner}>
                <View style={styles.circle} />
                <Text style={styles.physicalText}>Physical</Text>
              </View>

              <Text style={styles.physical1Text}>310/700</Text>
            </View>
            <Progress.Bar
              progress={0.6}
              width={width - 72}
              color="#47A0FF"
              unfilledColor="#F7F7F7"
              borderWidth={0}
            />
            <View style={styles.physicalContainer}>
              <View style={styles.physicalConatiner}>
                <View style={styles.square} />
                <Text style={styles.intellectualText}>Intellectual</Text>
              </View>

              <Text style={styles.physical1Text}>305/600</Text>
            </View>
            <Progress.Bar
              progress={0.7}
              width={width - 72}
              color="#1BE9A5"
              unfilledColor="#F7F7F7"
              borderWidth={0}
            />
            <View style={styles.physicalContainer}>
              <View style={styles.physicalConatiner}>
                <View style={styles.triangle} />
                <Text style={styles.mentalText}>Mental</Text>
              </View>

              <Text style={styles.physical1Text}>65/200</Text>
            </View>
            <Progress.Bar
              progress={0.4}
              width={width - 72}
              color="#FAD059"
              unfilledColor="#F7F7F7"
              borderWidth={0}
            />
          </View>
          <View style={styles.recentContainer}>
            <Text style={styles.recentText}>Recent packs</Text>
            <Text style={styles.seeMoreText}>See more</Text>
          </View>

          {lessionsSelected.map(item => (
            <PackItem lession={item} key={item.lession_key} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
