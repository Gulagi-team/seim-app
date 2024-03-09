import React, {useEffect, useRef, useState} from 'react';
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
import {StoreState, useAppSelector} from '@/store';
import FastImage from 'react-native-fast-image';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import ListTaskContent from './component/ListTask';
import {navigate} from '@/helpers/navigation';
import {useDispatch} from 'react-redux';
// import Header from '@/components/Header';
import HeaderMain from '@/components/HeaderMain';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import IconAdd from '@/assets/icons/icon_add.svg';
import IconSearch from '@/assets/icons/icon_search.svg';
import IconSetting from '@/assets/icons/icon_settings.svg';
import {styles, rightMenuStyles, topicStyles} from './HomeScreen.styles';
import SCREENS from '@/constants/screen';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;

  // const dispatch = useDispatch();
  const lessionsSelected = useAppSelector(
    (state: StoreState) => state.LessionSlice.lessionsSelected,
  );

  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const renderFunction = ({item, index}: any) => {
    return <ListTaskContent lessionSelected={item} />;
  };

  const handleChangeTask = (to: number) => {
    const dis = to - idxContent;
    setIdxContent(to);
    ref.current?.scrollTo({count: dis});
  };

  const rightIcon = (): React.ReactNode => (
    <View style={rightMenuStyles.container}>
      <TouchableOpacity style={rightMenuStyles.iconSearch}>
        <IconSearch />
      </TouchableOpacity>
      <TouchableOpacity style={rightMenuStyles.iconSetting}>
        <IconSetting />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <HeaderMain
          canGoBack={false}
          renderLogo={true}
          rightContent={rightIcon()}
          rightContentStyle={rightMenuStyles.rightContent}
        />
        <View style={styles.viewBody}>
          <View>
            <ScrollView
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              style={styles.ScrollView}>
              {lessionsSelected.map((item, index) => (
                <TouchableOpacity
                  style={topicStyles.itemContainer}
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
                    <View style={topicStyles.selectedLine} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => navigate(SCREENS.TOPIC)}
                style={topicStyles.itemAdd}>
                <IconAdd />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Carousel
            ref={ref}
            loop={false}
            // style={{borderRadius:10}}
            width={width * 0.9 - 25}
            enabled={false}
            data={lessionsSelected}
            onSnapToItem={index => {
              setIdxContent(index);
            }}
            renderItem={renderFunction}
          />
        </View>
      </View>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
