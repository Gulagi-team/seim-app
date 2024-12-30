import api from './index';

export const getListHabit = (isHistory: boolean) => {
  return api.get('/users/habits' + (isHistory ? '?isHistory=true' : ''));
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

export const checkProgress = async () => {
  return api.get('/users/habits/progress');
};
