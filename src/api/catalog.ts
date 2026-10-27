import firestore from '@react-native-firebase/firestore';
import bundledLessions from '@/assets/json/lessions.json';
import bundledTopics from '@/assets/json/topics.json';
import bundledHabits from '@/assets/json/habits.json';
import {LessionType, Topic, Habit} from '@/types/colection';
import {
  KEY_CACHE_HABITS,
  KEY_CACHE_LESSIONS,
  KEY_CACHE_TOPICS,
  KEY_CATALOG_SYNCED_AT,
} from '@/constants/LocalStoreKey';
import {
  getJSONLocal,
  getStringLocal,
  setJSONLocal,
  setStringLocal,
} from '@/helpers/localStorage';

// Fully offline app. The only remote data is the pack list (lessions), pulled
// from Firestore exactly once, the first time the app runs after install. The
// topic list and the habit catalog always come from the bundled json, and every
// user action afterwards is local.

export interface HabitsPayload {
  today?: string;
  data?: Habit[];
}

const cacheOrBundle = <T>(key: string, bundle: T): T => {
  const cached = getJSONLocal<T>(key);
  return cached && (!Array.isArray(cached) || cached.length > 0)
    ? cached
    : bundle;
};

export const getCachedLessions = (): LessionType[] =>
  cacheOrBundle<LessionType[]>(
    KEY_CACHE_LESSIONS,
    bundledLessions.data as LessionType[],
  );

export const getCachedTopics = (): Topic[] =>
  cacheOrBundle<Topic[]>(KEY_CACHE_TOPICS, bundledTopics.data as Topic[]);

export const getCachedHabits = (): HabitsPayload => {
  const payload = cacheOrBundle<HabitsPayload>(
    KEY_CACHE_HABITS,
    bundledHabits as HabitsPayload,
  );
  // The bundle was exported in 2024, so its `today` is a frozen timestamp and
  // every streak counted from it. The catalog is read on every launch, so the
  // current date is stamped here instead of living in the json.
  return {...payload, today: new Date().toISOString()};
};

export const isCatalogSynced = () => Boolean(getStringLocal(KEY_CATALOG_SYNCED_AT));

const fetchLessionsRemote = async (): Promise<LessionType[] | null> => {
  const querySnapshot = await firestore().collection('lessions').get();
  const list: LessionType[] = [];
  querySnapshot.forEach(documentSnapshot => {
    const data = documentSnapshot.data();
    list.push({...data, key: data.lession_key} as unknown as LessionType);
  });
  return list;
};

export interface SyncReport {
  alreadySynced: boolean;
  lessions: 'remote' | 'bundle';
}

// Never throws: a failed pull just means the bundled pack list is used for this
// install, the app stays fully usable either way.
export const syncCatalogOnce = async (): Promise<SyncReport> => {
  if (isCatalogSynced()) {
    return {alreadySynced: true, lessions: 'bundle'};
  }

  let lessions: LessionType[] | null = null;
  try {
    lessions = await fetchLessionsRemote();
  } catch (error) {
    console.log('Sync lessions failed, use bundled packs', error);
  }

  if (lessions?.length) {
    setJSONLocal(KEY_CACHE_LESSIONS, lessions);
  }
  setStringLocal(KEY_CATALOG_SYNCED_AT, String(Date.now()));

  return {alreadySynced: false, lessions: lessions?.length ? 'remote' : 'bundle'};
};
