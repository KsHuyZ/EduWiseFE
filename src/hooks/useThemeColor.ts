import { create } from 'zustand';

import { THEME_COLOR, THEME_TYPES } from '@/constant';
import { getStorage, setStorage } from '@/utils';

const { THEME_DEFAULT } = THEME_TYPES;

interface ThemeState {
  theme: string;
}
export interface ThemeStore extends ThemeState {
  toggleTheme: (args: ThemeState['theme']) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (getStorage(THEME_COLOR) as string) ?? THEME_DEFAULT,
  toggleTheme: (theme: string) => {
    setStorage(THEME_COLOR, theme);
    set(() => ({
      theme,
    }));
  },
}));
