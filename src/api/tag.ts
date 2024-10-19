import axios from '@/lib/api';

import { ITag } from '@/types';

export const getTagsByName = (name: string): Promise<ITag[]> =>
  axios.get(`/tags/${name}`);
