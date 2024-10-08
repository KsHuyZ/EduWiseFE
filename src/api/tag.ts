import axios from '@/lib/api';

import { ITag } from '@/types';

export const getTagsByName = (name: string): Promise<ITag[]> =>
  axios.get(
    `/course/tags/get-by-name${name.length > 0 ? `?name=${name}` : ''}`
  );
