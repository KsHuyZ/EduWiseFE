import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCourses,
  createLesson,
  getCategories,
  getCoursesLesson,
  getTags,
  updateLesson,
} from '@/api';

import { CourseCredentials, Lesson, LessonCredentials } from '@/types';

export const useTag = (title: string) =>
  useQuery({
    queryKey: ['tag', title],
    queryFn: () => getTags(title),
    enabled: !!title,
  });

export const useCategory = (title: string) =>
  useQuery({
    queryKey: ['category', title],
    queryFn: () => getCategories(title),
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
    onSuccess: (response) => {
      queryClient.setQueryData(['lessons', id], (oldData: Lesson[]) => {
        return lessonId
          ? oldData.map((lesson) => {
              if (lesson.id === lessonId) {
                return response;
              }
              return lesson;
            })
          : [...oldData, response];
      });
    },
  });
};
