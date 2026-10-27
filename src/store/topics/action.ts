import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCachedTopics} from '@/api/catalog';
import {Topic} from '@/types/colection';

export interface TopicResponse {
  data: Topic[];
}

// The topic list ("Loại") is cached at first launch, so this only reads locally.
export const fetchTopics = createAsyncThunk(
  'topic/fetchTopics',
  async (): Promise<TopicResponse> => {
    return {data: getCachedTopics()};
  },
);
