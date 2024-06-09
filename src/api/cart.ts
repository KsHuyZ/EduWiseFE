import { __cartMock } from '@/__mocks__';

import { Lesson } from '@/types';

export const getUserCart = (): Promise<Lesson[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(__cartMock);
    }, 500);
  });
