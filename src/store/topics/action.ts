import {setToken} from '@/api/index';
import {getListTopic as getListTopicAPI} from '@/api/topic';
import {KEY_AUTHEN} from '@/constants/LocalStoreKey';
import {writeToFile} from '@/helpers/file';
import {getStringLocal} from '@/helpers/localStorage';
import {Habit, HabitData, Topic} from '@/types/colection';
import {createAsyncThunk} from '@reduxjs/toolkit';

export interface TopicResponse {
  data: Topic[];
}

export const fetchTopics = createAsyncThunk(
  'topic/fetchTopics',
  async (): Promise<TopicResponse> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    const response = await getListTopicAPI();
    //save package to local
    const transferData: HabitData[] = [];
    response.data.data.forEach((item: any) => {
      transferData.push(...item.habits);
    });

    const final: Habit[] = transferData.map((item: any) => {
      const data = {
        habit: item,
        startDate: null,
        endDate: null,
      };

      return data;
    });

    await writeToFile(final, 'topics.json');

    return response.data.data;
  },
);
