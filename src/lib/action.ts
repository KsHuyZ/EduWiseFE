'use server';

import { cookies } from 'next/headers';
export const getCookies = (key: string) => {
  const value = cookies().get(key)?.value;
  try {
    if (value && value !== '') {
      return JSON.parse(value);
    }
    return value;
  } catch {
    return value;
  }
};

export const setCookies = (key: string, value: unknown) => {
  const valueString = JSON.stringify(value);
  cookies().set({
    name: key,
    value: valueString,
    httpOnly: true,
    secure: true,
    path: '/',
  });
};

export const deleteCookie = (key: string) => cookies().delete(key);
