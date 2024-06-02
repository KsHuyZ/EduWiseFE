import { THEME_TYPES } from '@/constant/theme';

const {
  THEME_DEFAULT,
  THEME_ORANGE,
  THEME_RED,
  THEME_SKY,
  THEME_SLATE,
  THEME_AMBER,
} = THEME_TYPES;

export const presetColors = [
  {
    label: THEME_DEFAULT,
    primary: '#059669',
    hover: '#d1fae5',
  },
  {
    label: THEME_SLATE,
    primary: '#475569',
    hover: '#f1f5f9',
  },
  {
    label: THEME_RED,
    primary: '#dc2626',
    hover: '#fee2e2',
  },
  {
    label: THEME_ORANGE,
    primary: '#ea580c',
    hover: '#ffedd5',
  },
  {
    label: THEME_AMBER,
    primary: '#d97706',
    hover: '#fef3c7',
  },
  {
    label: THEME_SKY,
    primary: '#0284c7',
    hover: '#e0f2fe',
  },
];

export const THEME_COLOR = 'theme-color';
