import { useMutation, useQuery } from '@tanstack/react-query';

import { createLesson, getLessonByCourseId, updateLesson } from '@/api';

import { LessonCredentials } from '@/types';

export const useLessons = (id?: string) =>
  useQuery({
    queryKey: ['lessons'],
    queryFn: () => getLessonByCourseId(id ?? ''),
    enabled: !!id,
  });

export const useModificationLesson = (id?: string) =>
  useMutation({
    mutationKey: ['modificationLesson'],
    mutationFn: (data: LessonCredentials) =>
      id ? updateLesson(data) : createLesson(data),
  });
