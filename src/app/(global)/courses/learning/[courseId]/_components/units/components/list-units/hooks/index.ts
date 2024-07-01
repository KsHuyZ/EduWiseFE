import { useQuery } from '@tanstack/react-query';

import { getCourseProgress } from '@/api';

export const useCourseProgress = (id: string) =>
  useQuery({
    queryKey: ['progress', id],
    queryFn: () => getCourseProgress(id),
  });
