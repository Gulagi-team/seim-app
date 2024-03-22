interface TaskItem {
  item_trans_title: string;
}

export interface LessionType {
  items: TaskItem[];
  lession_active: Boolean;
  lession_color: string;
  lession_day_total: number;
  lession_detail: string;
  lession_detail_sort: string;
  lession_img: string;
  lession_key: string;
  lession_title: string;
  lession_type_key: string;
  type: string[];
}

export interface TaskSelectedItem {
  item_trans_title: string;
  isDone: boolean;
}

export interface LessionSelectedType {
  items: TaskSelectedItem[];
  lession_active: Boolean;
  lession_color: string;
  lession_day_total: number;
  lession_detail: string;
  lession_detail_sort: string;
  lession_img: string;
  lession_key: string;
  lession_title: string;
  lession_type_key: string;
  type: string[];
}

export interface TaskToUpdate {
  lession_key: string;
  index: number;
}

export interface UserProfileType {
  email: string;
  name: string;
  avatar: string;
}

export type LanguageType =
  | 'vi'
  | 'en'
  | 'de'
  | 'id'
  | 'cn'
  | 'jp'
  | 'kr'
  | 'ru';
