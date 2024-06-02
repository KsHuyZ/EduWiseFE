import axios from '@/lib/axios';

import { ICategory } from '@/types';

export const getCategoriesByName = (name: string): Promise<ICategory[]> =>
  axios.get(
    `/course/categories/get-by-name${name.length > 0 ? `?name=${name}` : ''}`
  );
