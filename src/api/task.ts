import api from './index';

export const postTaskComplete = (habitId: string, taskId: string) => {
  return api.post('/tasks/complete', {habitId, taskId});
};

export const deleteTaskUnComplete = (taskId: string) => {
  return api.delete(`/tasks/delete/${taskId}`);
};

export const uploadTaskHistories = (data: any) => {
  // createdAt, isFinished, point, taskId
  return api.post('/tasks/upload', data);
};
