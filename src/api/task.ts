import api from './index';

export const postTaskComplete = (userHabitId: string, taskId: string) => {
  if (process.env.DEBUG) {
    return {};
  }
  return api.post('/tasks/complete', {userHabitId, taskId});
};

export const deleteTaskUnComplete = (taskId: string) => {
  if (process.env.DEBUG) {
    return {};
  }
  return api.delete(`/tasks/delete/${taskId}`);
};
