import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { enrollCourse } from '@/api';
import { validateError } from '@/utils';

export const useEnrollCourse = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => enrollCourse(id),
    onSuccess() {
      toast({ title: 'Enroll course success!', variant: 'success' });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
