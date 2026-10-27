import TaskDefault from '@/assets/icons/task/task_default.svg';
import TaskDrink from '@/assets/icons/task/task_drink.svg';
import TaskMeditation from '@/assets/icons/task/task_meditation.svg';
import TaskRunning from '@/assets/icons/task/task_running.svg';
import TaskSleep from '@/assets/icons/task/task_sleep.svg';
import TaskStudy from '@/assets/icons/task/task_study.svg';
import TaskWalk from '@/assets/icons/task/task_walk.svg';
import TaskWater from '@/assets/icons/task/task_water.svg';

type IconComponent = React.ComponentType<any>;

// Task names arrive from the API as free text, so match on keywords.
// Order matters: the first bucket that hits wins.
const TASK_ICONS: {keywords: string[]; Icon: IconComponent}[] = [
  {keywords: ['nhậu', 'nhau', 'beer', 'rượu', 'ruou', 'alcohol'], Icon: TaskDrink},
  {keywords: ['chạy', 'chay', 'run', 'jog', 'tập thể dục'], Icon: TaskRunning},
  {keywords: ['nước', 'nuoc', 'water', 'uống', 'uong'], Icon: TaskWater},
  {keywords: ['ngủ', 'ngu', 'sleep', 'nap'], Icon: TaskSleep},
  {keywords: ['thiền', 'thien', 'meditat', 'yoga', 'tĩnh tâm'], Icon: TaskMeditation},
  {keywords: ['đọc', 'doc', 'read', 'book', 'sách', 'sach', 'học', 'hoc', 'study'],
    Icon: TaskStudy},
  {keywords: ['đi', 'di', 'walk', 'bước', 'buoc', 'dạo', 'ngoài', 'ngoai', 'vận động'],
    Icon: TaskWalk},
];

export const getTaskIcon = (name?: string): IconComponent => {
  const target = (name || '').toLowerCase();
  const hit = TASK_ICONS.find(item =>
    item.keywords.some(keyword => target.includes(keyword)),
  );
  return hit ? hit.Icon : TaskDefault;
};
