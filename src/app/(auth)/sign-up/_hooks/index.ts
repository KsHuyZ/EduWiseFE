import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { signUp, teacherSignUp } from '@/api';
import { validateError } from '@/utils';

import { TSignUpCredentials } from '@/types';

export const useSignUp = (type: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: TSignUpCredentials) =>
      type === 'student' ? signUp(values) : teacherSignUp(values),
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
