import { useMutation } from '@tanstack/react-query';

import { createCourses, updateCourses } from '@/api';

import { CourseCredentials } from '@/types';

export const useModificationCourse = (id?: string) =>
  useMutation({
    mutationFn: (course: CourseCredentials) =>
      id ? updateCourses(course) : createCourses(course),
  });
