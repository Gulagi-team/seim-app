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
  habit: HabitData;
  task_id: string;
  isFinished: boolean;
}

export interface UserProfileType {
  access_token: string;
  email: string;
  name: string;
  avatar: string;
  refferal: number;
}

export interface Habit {
  startDate: string | null;
  endDate: string | null;
  habit: HabitData;
}

export interface HabitData {
  id: string;
  name: string;
  icon: string;
  description: string;
  days: number;
  exp: number;
  rating: number;
  tasks?: Task[];
}

export interface Task {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  history: any | null;
  isFinished: boolean;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  habits: HabitData[];
}
export interface MiningData {
  startDate: number;
  endDate: number;
  point: number;
  level: number;
  miningRate: string;
  totalInvite: number;
  totalPoolMined: number;
  isDone?: boolean;
  boost?: number;
  idTemp?: number;
  isClaimed?: boolean;
  deviceId?: string;
  id?: string;
  createdAt?: string;
}

export interface Filter {
  page: number;
  limit: number;
  sortBy: string;
  sortDir: string;
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
