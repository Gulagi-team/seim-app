// One-time content sync: the app pulls the packs (lessions), the topic list and
// the habit catalog exactly once, right after install. Everything after that is
// served from these caches and the persisted redux store.
export const KEY_CATALOG_SYNCED_AT = 'catalogSyncedAt';
export const KEY_CACHE_LESSIONS = 'cacheLessions';
export const KEY_CACHE_TOPICS = 'cacheTopics';
export const KEY_CACHE_HABITS = 'cacheHabits';
