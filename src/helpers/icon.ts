import YOUTUBE from '@/assets/icons/tasks/Youtube.svg';
import icons from '@/assets/json/icons.json';

import ALCOHOL from '@/assets/icons/tasks/Alcohol.svg';
import CHAT from '@/assets/icons/tasks/Chat.svg';
import DRINK from '@/assets/icons/tasks/Drink.svg';
import COFFEE from '@/assets/icons/tasks/DrinkCofffee.svg';
import FACEBOOK from '@/assets/icons/tasks/Facebook.svg';
import FACE_MASK from '@/assets/icons/tasks/FaceMask.svg';
import FRUIT from '@/assets/icons/tasks/Fruit.svg';
import MEDITATION from '@/assets/icons/tasks/Meditation.svg';
import MUSIC from '@/assets/icons/tasks/Music.svg';
import PLAY_GAME from '@/assets/icons/tasks/PlayGame.svg';
import PODCAST from '@/assets/icons/tasks/Podcast.svg';
import PUSHUP from '@/assets/icons/tasks/Pushup.svg';
import READING from '@/assets/icons/tasks/Reading.svg';
import RUN from '@/assets/icons/tasks/Running.svg';
import SLEEP from '@/assets/icons/tasks/Sleep.svg';
import SMOKING from '@/assets/icons/tasks/Smoking.svg';
import TIKTOK from '@/assets/icons/tasks/Tiktok.svg';
import VEGAN_FOOD from '@/assets/icons/tasks/VeganFood.svg';
import WALKING from '@/assets/icons/tasks/Walking.svg';
import WASHING from '@/assets/icons/tasks/Washing.svg';
import WATCHING from '@/assets/icons/tasks/Watching.svg';
import CARDIO from '@/assets/icons/topics/Cardio.svg';
import CYCLE from '@/assets/icons/topics/Cycle.svg';
import MEDITATION_TOPIC from '@/assets/icons/topics/Meditation.svg';
import MUSCLES from '@/assets/icons/topics/Muscles.svg';
import RUNNING from '@/assets/icons/topics/Running.svg';
import VEGETABLE from '@/assets/icons/topics/Vegetable.svg';

export const iconMap = {
  youtube: YOUTUBE,
  watching: WATCHING,
  washing: WASHING,
  veganFood: VEGAN_FOOD,
  walking: WALKING,
  smoking: SMOKING,
  reading: READING,
  run: RUN,
  sleep: SLEEP,
  pushup: PUSHUP,
  podcast: PODCAST,
  playGame: PLAY_GAME,
  meditation: MEDITATION,
  music: MUSIC,
  fruit: FRUIT,
  tiktok: TIKTOK,
  faceMask: FACE_MASK,
  cofffee: COFFEE,
  alcohol: ALCOHOL,
  facebook: FACEBOOK,
  drink: DRINK,
  chat: CHAT,
  vegetable: VEGETABLE,
  meditation_topic: MEDITATION_TOPIC,
  muscles: MUSCLES,
  running: RUNNING,
  cardio: CARDIO,
  cycle: CYCLE,
  empty: YOUTUBE,
};

export function generateArray(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
// export function getIcon(name: string): any {
//   console.log('name:', name);
//   return iconMap[name] || require('@/assets/icons/tasks/Youtube.svg'); // Fallback to a default icon
// }

export function getIcon(name: string): any {
  //use icons.json
  const icon = icons.find(icon => icon.name === name);
  const defaultIcon =
    'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144843-2021-05-28su_lession144842.png?alt=media&token=24b73dcb-271b-4d0b-ab7a-5cdd5970dd0f';
  return icon ? icon.url : defaultIcon;
}
