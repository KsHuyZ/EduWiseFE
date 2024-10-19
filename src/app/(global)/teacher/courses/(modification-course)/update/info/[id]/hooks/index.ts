import { useQuery } from '@tanstack/react-query';

import { getCourseById } from '@/api';

export const useCourseInfo = (id: string) =>
  useQuery({
    queryKey: ['course-info', id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
