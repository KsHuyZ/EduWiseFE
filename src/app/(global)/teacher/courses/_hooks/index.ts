import { useQuery } from '@tanstack/react-query';

import { getCourses } from '@/api';

export const useTeacherCourse = () =>
  useQuery({
    queryKey: ['teacher-course'],
    queryFn: getCourses,
  });
