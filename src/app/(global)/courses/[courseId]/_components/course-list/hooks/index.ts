import { useQuery } from '@tanstack/react-query';

import { getLessonByCourseId } from '@/api';

export const useLessonList = (id: string) =>
  useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLessonByCourseId(id),
  });
