import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-in/types';

import { Token, UserType } from '@/types';
import { SignInResponse } from '@/types/response';

export const signIn = (user: UserCredentials): Promise<SignInResponse> =>
  axios.post('/auth/login', user);

export const saveUser = (user: UserType) =>
  fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(user),
  });

export const saveToken = (token: Token) =>
  fetch('/api/token', {
    method: 'POST',
    body: JSON.stringify(token),
  });
