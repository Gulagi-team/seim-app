import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import Header from '@/components/Header';
import Search from '@/components/Search/SearchInput';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {StoreState, useAppSelector} from '@/store';
import {fetchTopics} from '@/store/topics/action';
import {Topic} from '@/types/colection';
import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './TopicScreen.styles';
import {iconMap} from '@/helpers/icon';

const TopicScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.pop();
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
        {filteredData.map(topic => {
          const ICON = iconMap[topic.icon as keyof typeof iconMap];
          return (
            <TouchableOpacity
              key={topic.id}
              style={styles.item}
              onPress={() => navigate(SCREENS.LESSION, topic)}>
              {typeof ICON === 'function' ? <ICON /> : ICON}
              <View style={styles.itemTitle}>
                <Text style={styles.title}>{topic.name}</Text>
                <Text style={styles.secondTitle}>{topic.description}</Text>
                <Text style={styles.thridTitle}>
                  {topic.habits.length} lession
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
