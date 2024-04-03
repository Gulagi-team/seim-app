import api from './index';
import habits from '@/assets/json/habits.json';

export const getListHabit = () => {
  if (process.env.DEBUG) {
    console.log('true');
    return habits;
  }
  console.log('false');
  return api.get('/users/habits');
};

export const putStartHabit = (id: string) => {
  if (process.env.DEBUG) {
    return {};
  }
  return api.put('/users/habits', {id});
};

export const postSaveHabit = (habitId: string, isStart: boolean) => {
  if (process.env.DEBUG) {
    return {};
  }
  return api.put('/users/habits', {habitId, isStart});
};
