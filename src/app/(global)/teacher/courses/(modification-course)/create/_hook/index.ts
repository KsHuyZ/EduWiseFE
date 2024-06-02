import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCourses,
  createLesson,
  getCategoriesByName,
  getCoursesLesson,
  getTagsByName,
  updateLesson,
} from '@/api';

import { CourseCredentials, LessonCredentials } from '@/types';

export const useTag = (title: string) =>
  useQuery({
    queryKey: ['tag', title],
    queryFn: () => getTagsByName(title),
    enabled: !!title,
  });

export const useCategory = (title: string) =>
  useQuery({
    queryKey: ['category', title],
    queryFn: () => getCategoriesByName(title),
    enabled: !!title,
  });

export const useCreateCourse = () =>
  useMutation({
    mutationFn: (course: CourseCredentials) => createCourses(course),
  });

export const useLessons = (id?: string) =>
  useQuery({
    queryKey: ['lessons', id],
    queryFn: () => getCoursesLesson(id!),
    enabled: !!id,
  });
export const useModificationLesson = (id: string, lessonId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lesson: LessonCredentials) =>
      lessonId ? updateLesson(lesson) : createLesson(lesson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};
