import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { signIn } from '@/api';
import { validateError } from '@/utils';

import { TSignInCredentials } from '@/types';

export const useSignIn = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: TSignInCredentials) => signIn(values),
    onSuccess() {
      toast({
        variant: 'success',
        title: 'Sign in success',
        description: 'You are sign in success!',
      });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
