import {MiningData} from '@/types/colection';

export const getMining = () => {
  const currentDate = new Date();

  // Set the time to 1 AM
  currentDate.setHours(7, 0, 0, 0);
  const start = currentDate.getTime();

  const miningInfo: MiningData = {
    startDate: start,
    endDate: start + 24 * 60 * 60 * 1000,
    point: 10.267,
    level: 5,
    miningRate: '',
    totalInvite: 15,
    totalPoolMined: 10,
  };

  return miningInfo;
};
