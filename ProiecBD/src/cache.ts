// src/cache.ts

export const loadCache = <T>(key: string): T | null => {
  const data = sessionStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const saveCache = <T>(key: string, data: T): void => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const clearCache = (key: string): void => {
  sessionStorage.removeItem(key);
};
