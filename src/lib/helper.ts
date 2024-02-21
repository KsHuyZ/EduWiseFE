export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const getCookies = async (key: string) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const value = cookies().get(key)?.value;
    if (value) {
      return JSON.parse(value);
    }
  }
};

export const setCookies = async (key: string, value: any) => {
  const valueString = JSON.stringify(value);
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    cookies().set({
      name: key,
      value: valueString,
      httpOnly: true,
      secure: true,
      path: '/',
    });
  }
};

export const deleteCookies = async (key: string) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    cookies().delete(key);
  }
};
