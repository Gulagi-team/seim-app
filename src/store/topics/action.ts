import {createAsyncThunk} from '@reduxjs/toolkit';
import {getListTopic as getListTopicAPI} from '@/api/topic';
import {Topic} from '@/types/colection';

export interface TopicResponse {
  data: Topic[];
}

export const fetchTopics = createAsyncThunk(
  'topic/fetchTopics',
  async (): Promise<TopicResponse> => {
    // const token = getStringLocal(KEY_AUTHEN) || '';
    // setToken(token);
    return await getListTopicAPI();
  },
);
