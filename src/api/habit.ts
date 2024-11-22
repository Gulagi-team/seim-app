import api from './index';
import habits from '@/assets/json/habits.json';

export const getListHabit = () => {
  return api.get('/users/habits');
};

export const putStartHabit = (id: string) => {
  return api.put('/users/habits/' + id);
};

export const postSaveHabit = (habitId: string, isStart: boolean) => {
  return api.post('/users/habits', {habitId, isStart});
};

export const uploadHabit = (data: any) => {
  return api.post('/users/habits/upload', data);
};

export const deleteHabitById = (id: string) => {
  return api.delete('/users/habits/' + id);
};
