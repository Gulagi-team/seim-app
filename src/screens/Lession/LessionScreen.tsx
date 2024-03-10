import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Header from '@/components/Header';
import Search from '@/components/Search/SearchInput';
import {styles} from './LessionScreen.styles';
import {AddIcon, Icon} from '@gluestack-ui/themed';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import LessionIcon from '@/assets/icons/lession.svg';
import StarIcon from '@/assets/icons/star.svg';
import SCREENS from '@/constants/screen';

const LessionScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.pop();

  return (
    <SafeAreaView style={styles.container}>
      <Search style={styles.searchBar} onChange={value => console.log(value)} />
      <Header
        renderLogo={false}
        canGoBack={true}
        handleGoBack={goBack}
        rightContent={<Text style={styles.textTitle}>Health care</Text>}
      />
      <ScrollView style={styles.ScrollView}>
        <TouchableOpacity style={styles.item}>
          <LessionIcon style={styles.itemImg} />
          <View style={styles.itemTitle}>
            <Text style={styles.title}>Health care</Text>
            <Text style={styles.secondTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            <View style={styles.statIcon}>
              <StarIcon />
              <Text style={styles.statText}>4.8</Text>
            </View>
          </View>
          <View style={styles.addStyle}>
            <Icon as={AddIcon} color="#FFFFFF" size="sm" />
            <Text style={styles.addText}>Save</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default LessionScreen;
