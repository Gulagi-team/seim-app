
// import PackSreen from './PackSreen.module.scss';
// import style from "./PackSreen.module.scss";

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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { StoreState, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import ListTaskContent from './component/ListTask';
import HeartBottom from '@/assets/images/bg_home.svg';
import IconAdd from '@/assets/icons/icon_add.svg';
import { navigate } from '@/helpers/navigation';
import Header from '@/components/Header';
import { styles } from './HomeScreen.styles';
import HeaderMain from '@/components/HeaderMain';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const lessionsSelected = useAppSelector(
    (state: StoreState) => state.LessionSlice.lessionsSelected,
  );
  const width = Dimensions.get('window').width;
  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const [open, setOpen] = useState(false);

  const renderFunction = ({ item, index }: any) => {
    return <ListTaskContent lessionSelected={item} />;
  };

  const handleChangeTask = (to: number) => {
    const dis = to - idxContent;
    setIdxContent(to);
    ref.current?.scrollTo({ count: dis });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <HeaderMain canGoBack={false} renderLogo={true}></HeaderMain>
        <View style={styles.viewBody}>
          <View>
            <ScrollView
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              style={styles.ScrollView}>
              {lessionsSelected.map((item, index) => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => handleChangeTask(index)}
                  key={item.lession_key}>
                  <FastImage
                    style={styles.imgF}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144843-2021-05-28su_lession144842.png?alt=media&token=24b73dcb-271b-4d0b-ab7a-5cdd5970dd0f',
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  {index === idxContent && (
                    <View
                      style={{
                        width: '100%',
                        height: 4,
                        backgroundColor: 'black',
                        borderRadius: 50,
                      }}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => navigate('LessionTypeScreen')}
                style={{
                  height: 46,
                  width: 46,
                  backgroundColor: '#E6E6E6',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconAdd />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Carousel
            ref={ref}
            loop={false}
            // style={{borderRadius:10}}
            width={width - 30}
            enabled={false}
            data={lessionsSelected}
            onSnapToItem={index => {
              setIdxContent(index);
            }}
            renderItem={renderFunction}
          />
        </View>
      
      </View>
        {/* <HeartBottom
        style={styles.backgroundImg}
      /> */}
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
