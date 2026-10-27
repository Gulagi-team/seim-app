import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchTopics} from '@/store/topics/action';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '@/helpers/navigation';
import Header from '@/components/Header';
import HabitImage from '@/components/HabitImage';
import Search from '@/components/Search/SearchInput';
import {styles} from './TopicScreen.styles';
import HealthCare from '@/assets/images/health.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {Topic} from '@/types/colection';
import SCREENS from '@/constants/screen';

const TopicScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [searchText, onChangeSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Topic[]>([]);

  const topics = useAppSelector((state: StoreState) => state.TopicSlice.topics);

  useEffect(() => {
    dispatch(fetchTopics());
  }, []);

  useEffect(() => {
    const filtered = topics.filter(topic =>
      topic.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (searchText === '') {
      return setFilteredData(topics);
    }

    setFilteredData(filtered);
  }, [searchText, topics]);

  return (
    <SafeAreaView style={styles.container}>
      <Search
        style={styles.searchBar}
        label="Search"
        onChange={onChangeSearch}
      />
      <Header
        renderLogo={false}
        canGoBack={true}
        handleGoBack={goBack}
        rightContent={<Text style={styles.textTitle}>Categories</Text>}
      />
      <ScrollView style={styles.ScrollView}>
        {filteredData.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={styles.item}
            onPress={() => navigate(SCREENS.LESSION, topic)}>
            <HabitImage style={styles.itemImg} name={topic.name} />
            <View style={styles.itemTitle}>
              <Text style={styles.title}>{topic.name}</Text>
              <Text style={styles.secondTitle}>{topic.description}</Text>
              <Text style={styles.thridTitle}>
                {topic.habits.length} lession
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default TopicScreen;
