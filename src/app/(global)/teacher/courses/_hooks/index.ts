import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { createVideo, deleteLessonById, getTeacherCourses } from '@/api';
import { validateError } from '@/utils';

import { TVideoCredentials } from '@/types';

export const useTeacherCourse = () =>
  useQuery({
    queryKey: ['teacher-course'],
    queryFn: () => getTeacherCourses(),
  });

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteLessonById(id),
    onSuccess() {
      toast({ title: 'Delete lesson success!', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (video: TVideoCredentials) => createVideo(video),
    onSuccess() {
      toast({ title: 'Create video success!', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
