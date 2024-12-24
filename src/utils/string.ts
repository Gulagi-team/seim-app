import moment from 'moment';

export const stringUtils = {
  formatNumber: (number: number) => `0${number}`.slice(-2),
  calculateTimeAdjustment: (boostAdjust: number) => {
    if (boostAdjust === 0) {
      return 0;
    }

    const speedMultiplier = boostAdjust / 100;

    const durationInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const hourRemaining =
      24 - (durationInMs / 1000 / 60 / 60) * speedMultiplier;

    const adjustedDuration = hourRemaining * 60 * 60 * 1000;
    return durationInMs - adjustedDuration;
  },

  formatTime: (time: Date, langCode: string) => {
    if (langCode === 'vi') {
      return moment(time).format('HH:mm DD/MM/YYYY');
    }
    if (langCode === 'kr') {
      return moment(time).format('YYYY년 MM월 DD일 HH:mm');
    }
    if (langCode === 'cn') {
      return moment(time).format('YYYY年MM月DD日 HH:mm');
    }
    return moment(time).format('HH:mm DD/MM/YYYY');
  },

  getMaxInviteByLevel(level: number): number {
    const levelMap: Record<number, number> = {
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    };
    return levelMap[level] ?? 10; // Default to 10 if level is 1 or undefined
  },

  caculateTimeAgos: (time: string) => {
    const now = moment();
    const timeDate = moment(time);
    const diffInSeconds = now.diff(timeDate, 'seconds');

    if (diffInSeconds >= 365 * 24 * 60 * 60) {
      const years = now.diff(timeDate, 'years');
      return {level: 6, time: years};
    }
    if (diffInSeconds >= 30 * 24 * 60 * 60) {
      const months = now.diff(timeDate, 'months');
      return {level: 5, time: months};
    }
    if (diffInSeconds >= 7 * 24 * 60 * 60) {
      const weeks = now.diff(timeDate, 'weeks');
      return {level: 4, time: weeks};
    }
    if (diffInSeconds >= 24 * 60 * 60) {
      const days = now.diff(timeDate, 'days');
      return {level: 3, time: days};
    }
    if (diffInSeconds >= 60 * 60) {
      const hours = now.diff(timeDate, 'hours');
      return {level: 2, time: hours};
    }
    if (diffInSeconds >= 60) {
      const minutes = now.diff(timeDate, 'minutes');
      return {level: 1, time: minutes};
    }
    return {level: 0, time: diffInSeconds};
  },

  generateCode: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    let code = '';

    // Generate first 3 letters
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 4 digits
    for (let i = 0; i < 4; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // Generate last 3 letters
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return code;
  },
};
