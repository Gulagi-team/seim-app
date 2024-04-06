import Header from '@/components/Header';
import navigation from '@/navigation';
import {ApplicationScreenProps} from '@/types/navigation';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import IconEnglish from '@/assets/icons/icon_english.svg';
import IconVietNam from '@/assets/icons/icon_vietnam.svg';
import IconChina from '@/assets/icons/icon_china.svg';
import IconKorea from '@/assets/icons/icon_indonesia.svg';
import {useTranslation} from 'react-i18next';
// import i18next from 'i18next';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import {updateLanguage} from '@/store/userInfo';
import {LanguageType} from '@/types/colection';
import {styles} from './LanguageScreen.styles';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';

const LanguageScreen = () => {
  const {t} = useTranslation(['startup']);
  const language = useAppSelector(
    (state: StoreState) => state.userInfo.language,
  );
  const {
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    borderSelectedColor,
    cardWalletTitleColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const onChangeLanguage = (lang: LanguageType) => {
    dispatch(updateLanguage(lang));
    // void i18next.changeLanguage(lang);
    // reduxStorage.setItem('language', lang);
  };
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title="Language" canGoBack={true} handleGoBack={goBack} />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'en' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('en')}>
          <View style={{flexDirection: 'row'}}>
            <IconEnglish />
            <Text style={{...styles.text, color: textColor}}>English (US)</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'en' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'en' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'vi' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('vi')}>
          <View style={{flexDirection: 'row'}}>
            <IconVietNam />
            <Text style={{...styles.text, color: textColor}}>Tiếng Việt</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'vi' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'vi' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'cn' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('cn')}>
          <View style={{flexDirection: 'row'}}>
            <IconChina />
            <Text style={{...styles.text, color: textColor}}>Chinese</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,

              borderColor:
                language === 'cn' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'cn' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'kr' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('kr')}>
          <View style={{flexDirection: 'row'}}>
            <IconKorea />
            <Text style={{...styles.text, color: textColor}}>Korea</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'kr' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'kr' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            borderColor: language === 'id' ? '#2dd4bf' : '#404040',
          }}
          onPress={() => onChangeLanguage('id')}>
          <View style={{flexDirection: 'row'}}>
            <IconIndonesia />
            <Text style={styles.text}>Indonesia</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor: language === 'id' ? '#2dd4bf' : '#404040',
            }}>
            {language === 'id' && <View style={styles.checkDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            borderColor: language === 'de' ? '#2dd4bf' : '#404040',
          }}
          onPress={() => onChangeLanguage('de')}>
          <View style={{flexDirection: 'row'}}>
            <IconGemany />
            <Text style={styles.text}>Germany</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor: language === 'de' ? '#2dd4bf' : '#404040',
            }}>
            {language === 'de' && <View style={styles.checkDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            borderColor: language === 'jp' ? '#2dd4bf' : '#404040',
          }}
          onPress={() => onChangeLanguage('jp')}>
          <View style={{flexDirection: 'row'}}>
            <IconJapan />
            <Text style={styles.text}>Japanese</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor: language === 'jp' ? '#2dd4bf' : '#404040',
            }}>
            {language === 'jp' && <View style={styles.checkDot} />}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            borderColor: language === 'ru' ? '#2dd4bf' : '#404040',
          }}
          onPress={() => onChangeLanguage('ru')}>
          <View style={{flexDirection: 'row'}}>
            <IconRussia />
            <Text style={styles.text}>Russia</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor: language === 'ru' ? '#2dd4bf' : '#404040',
            }}>
            {language === 'ru' && <View style={styles.checkDot} />}
          </View>
        </TouchableOpacity> */}
      </View>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default LanguageScreen;
