import { useQueries } from '@tanstack/react-query';

import { getCourseById, getCoursesLesson } from '@/api';

export const useCourse = (id: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['course', id],
        queryFn: () => getCourseById(id),
      },
      {
        queryKey: ['lesson-course', id],
        queryFn: () => getCoursesLesson(id),
      },
    ],
  });
