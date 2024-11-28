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

    return adjustedDuration;
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
};
