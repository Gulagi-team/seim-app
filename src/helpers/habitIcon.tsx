import React from 'react';
import PackCover from '@/assets/icons/pack/pack_cover.svg';
import PackIconFire from '@/assets/icons/pack/pack_icon_fire.svg';
import PackIconHeart from '@/assets/icons/pack/pack_icon_heart.svg';
import PackIconStreak from '@/assets/icons/pack/pack_icon_streak.svg';
import PackIconWater from '@/assets/icons/pack/pack_icon_water.svg';
import TaskMeditation from '@/assets/icons/task/task_meditation.svg';

type IconComponent = React.ComponentType<any>;

export interface HabitIcon {
  Icon: IconComponent;
  background: string;
  // The cover card is a full tile design, the glyphs are small marks in the
  // middle of the tile, so each one needs its own share of the box.
  scale: number;
}

// Habit and topic names are free text, so match on keywords. Order matters: the
// first bucket that hits wins. No remote icon is involved, the whole set is
// bundled with the app.
const HABIT_ICONS: {keywords: string[]; Icon: IconComponent; background: string}[] = [
  {
    keywords: ['nước', 'nuoc', 'water', 'uống', 'uong', 'sữa', 'sua', 'café', 'cafe'],
    Icon: PackIconWater,
    background: '#E4F7F4',
  },
  {
    keywords: ['thể dục', 'tap the duc', 'chạy', 'chay', 'run', 'gym', 'tập', 'tap'],
    Icon: PackIconFire,
    background: '#FFECEC',
  },
  {
    keywords: ['ngủ', 'ngu', 'sleep', 'giấc', 'giac'],
    Icon: PackIconStreak,
    background: '#FFF6E4',
  },
  {
    keywords: ['thiền', 'thien', 'meditat', 'yoga', 'tĩnh', 'tinh', 'tâm lý', 'tam ly', 'bình an'],
    Icon: TaskMeditation,
    background: '#EFEDFF',
  },
  {
    keywords: ['yêu', 'yeu', 'love', 'trái tim', 'trai tim', 'sức khỏe', 'suc khoe'],
    Icon: PackIconHeart,
    background: '#FDECF3',
  },
];

export const getHabitIcon = (name?: string | null): HabitIcon => {
  const target = (name || '').toLowerCase();
  const hit = HABIT_ICONS.find(item =>
    item.keywords.some(keyword => target.includes(keyword)),
  );
  return hit
    ? {Icon: hit.Icon, background: hit.background, scale: 0.55}
    : {Icon: PackCover, background: 'transparent', scale: 0.85};
};
