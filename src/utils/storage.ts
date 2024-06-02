export const getStorage = (key: string): unknown | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    try {
      return item !== null ? JSON.parse(item) : item;
    } catch (error) {
      return item;
    }
  }
  return null;
};
export const setStorage = (key: string, value: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
