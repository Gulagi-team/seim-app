import icons from '@/assets/json/icons.json';

export function generateArray(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export function getIcon(name: string): any {
  //use icons.json
  const icon = icons.find(icon => icon.name === name);
  const defaultIcon =
    'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144843-2021-05-28su_lession144842.png?alt=media&token=24b73dcb-271b-4d0b-ab7a-5cdd5970dd0f';
  return icon ? icon.url : defaultIcon;
}
