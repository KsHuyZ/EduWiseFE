import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { changeCourseStatus } from '@/api';
import { validateError } from '@/utils';

import { ECourseStatus } from '@/types';

interface ICourseStatus {
  id: string;
  status: ECourseStatus;
}

export const useCourseStatus = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id, status }: ICourseStatus) =>
      changeCourseStatus(id, status),
    onSuccess() {
      toast({ variant: 'success', title: 'Update status course success!' });
    },
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
