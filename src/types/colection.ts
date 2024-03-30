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
  habit_id: string;
  task_id: string;
}

export interface UserProfileType {
  email: string;
  name: string;
  avatar: string;
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
