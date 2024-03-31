import {useMemo, useRef, useState} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

import Header from '@/components/Header';

import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import GetInfoStep1Content from './components/GetInfoStep1';
import GetInfoStep2Content from './components/GetInfoStep2';
// import PaginationItem from '@/components/pagination/Pagination';
import {navigate, navigateReset} from '@/helpers/navigation';
import GetInfoStep3Content from './components/GetInfoStep3';
import GetInfoStep4Content from './components/GetInfoStep4';
import GetInfoStep5Content from './components/GetInfoStep5';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import PaginationItem from '@/components/pagination/Pagination';
import SCREENS from '@/constants/screen';
import {updateProfile} from '@/api/auth';

const GetInfoScreen = () => {
  const width = Dimensions.get('window').width;
  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const userInfo = useAppSelector((state: StoreState) => state.userInfo);

  const handleGoNext = async () => {
    if (idxContent < 4) {
      if (idxContent === 2) {
        Keyboard.dismiss();
      }
      ref.current?.next();
    } else {
      reduxStorage.setItem('isGetInfoDone', 'true');
      reduxStorage.setItem('userInfo', JSON.stringify(userInfo));
      // const profile = {
      //   phone: '0336015016',
      //   avatar: userInfo.avatar,
      //   referBy: 'seim',
      //   gender: userInfo.gender,
      //   old: userInfo.old,
      //   height: userInfo.height,
      //   weight: userInfo.weight,
      // };
      // const respone = await updateProfile(profile);
      // console.log('respone', respone);
      navigateReset(SCREENS.PACK);
    }
  };

  const disableContinue = useMemo(() => {
    if (idxContent === 0 && !userInfo.language) {
      return true;
    }
    if (idxContent === 1 && !userInfo.gender) {
      return true;
    }
    if (idxContent === 2 && !userInfo.old) {
      return true;
    }
    if (idxContent === 3 && !userInfo.height) {
      return true;
    }
    if (idxContent === 4 && !userInfo.weight) {
      return true;
    }
    return false;
  }, [
    idxContent,
    userInfo.language,
    userInfo.gender,
    userInfo.old,
    userInfo.height,
    userInfo.weight,
  ]);

  const dataRender = [0, 1, 2, 3, 4];

  const renderFunction = ({item, index}: any) => {
    switch (item) {
      case 0:
        return <GetInfoStep1Content />;
      case 1:
        return <GetInfoStep2Content />;
      case 2:
        return <GetInfoStep3Content />;
      case 3:
        return <GetInfoStep4Content />;
      default:
        return <GetInfoStep5Content />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        renderLogo
        canGoBack={!(idxContent === 0)}
        handleGoBack={() => ref.current?.prev()}
      />
      <View style={styles.contentContainer}>
        <Carousel
          ref={ref}
          loop={false}
          width={width}
          enabled={false}
          data={dataRender}
          onSnapToItem={index => {
            setIdxContent(index);
          }}
          renderItem={renderFunction}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.paginationContainer}>
          {dataRender.map((backgroundColor, index) => {
            return (
              <PaginationItem
                index={index}
                key={index}
                animValue={idxContent}
                length={dataRender.length}
              />
            );
          })}
        </View>
        <TouchableOpacity
          onPress={handleGoNext}
          style={{
            ...styles.continueContent,
            opacity: disableContinue ? 0.25 : 1,
          }}
          disabled={disableContinue}>
          <Text style={styles.continue}>
            {idxContent < 4 ? 'Continue' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {alignItems: 'center', width: '100%', flex: 1},
  skip: {
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#262626',
    textAlign: 'left',
    fontSize: 14,
  },
  footerContainer: {height: 100, width: '100%', paddingVertical: 16},
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignSelf: 'center',
  },
  continueContent: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: '#1b9cfc',
    width: 250,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  continue: {
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#fff',
    textAlign: 'left',
  },
});

export default GetInfoScreen;
