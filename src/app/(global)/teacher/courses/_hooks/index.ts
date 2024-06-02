import { useQuery } from '@tanstack/react-query';

import { getTeacherCourses } from '@/api';

export const useTeacherCourse = () =>
  useQuery({
    queryKey: ['teacher-course'],
    queryFn: () => getTeacherCourses(),
  });
