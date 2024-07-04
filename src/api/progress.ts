import axios from '@/lib/axios';

import { TCourseProgress } from '@/types';

export const getCourseProgress = (id: string): Promise<TCourseProgress> =>
  axios.get(`/study-progress/get?id=${id}`);
