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
import {useEffect, useRef, useState} from 'react';
import {StoreState, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import ListTaskContent from './component/ListTask';
import HeartBottom from '@/assets/images/wel.svg';
import IconAdd from '@/assets/icons/icon_add.svg';
import {navigate} from '@/helpers/navigation';

const PackScreen = () => {
  const dispatch = useDispatch();
  const lessionsSelected = useAppSelector(
    (state: StoreState) => state.LessionSlice.lessionsSelected,
  );
  const width = Dimensions.get('window').width;
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          // backgroundColor: 'gray',
        }}>
        {/* <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: 'gray',
          }}></View> */}
        <FastImage
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: '#E6E6E6',
          }}
          source={{
            uri: 'https://seim-gulagi.web.app/assets/imgs/self.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          width: '90%',
          height: '85%',
          borderRadius: 10,
          marginTop: 14,
          backgroundColor: '#fff',
        }}>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 13,
              marginBottom: 12,
              marginHorizontal: 30,
            }}>
            {lessionsSelected.map((item, index) => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => handleChangeTask(index)}
                key={item.lession_key}>
                <FastImage
                  style={{
                    height: 46,
                    width: 46,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144843-2021-05-28su_lession144842.png?alt=media&token=24b73dcb-271b-4d0b-ab7a-5cdd5970dd0f',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                {index === idxContent && (
                  <View
                    style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: 'black',
                      borderRadius: 40,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigate('HomeScreen')}
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
          width={width}
          enabled={false}
          data={lessionsSelected}
          onSnapToItem={index => {
            setIdxContent(index);
          }}
          renderItem={renderFunction}
        />
      </View>
      <HeartBottom
        style={{
          position: 'absolute',
          width: '100%',
          height: '30%',
          zIndex: -1,
          bottom: 0,
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginTop: 14,
    paddingTop: 7,
    paddingHorizontal: 16,
  },
});
export default PackScreen;
