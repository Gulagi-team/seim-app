import {createAsyncThunk} from '@reduxjs/toolkit';
import {getListTopic as getListTopicAPI} from '@/api/topic';
import {setToken} from '@/api/index';
import {getStringLocal} from '@/helpers/localStorage';
import {KEY_AUTHEN} from '@/constants/LocalStoreKey';
import {Topic} from '@/types/colection';

export interface TopicResponse {
  data: Topic[];
}

export const fetchTopics = createAsyncThunk(
  'topic/fetchTopics',
  async (): Promise<TopicResponse> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    return await getListTopicAPI();
  },
);
