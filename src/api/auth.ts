import axios from '@/lib/axios';

import { RefreshTokenResponse, TSignUpCredentials } from '@/types';

export const refreshToken = (
  refreshToken: string
): Promise<RefreshTokenResponse> =>
  axios.post('/auth/refresh', `Bearer ${refreshToken}`);

export const signOut = () => axios.get('/auth/logout');

export const teacherSignUp = (user: TSignUpCredentials) =>
  axios.post('/auth/register-teacher', user);

export const signUp = (user: TSignUpCredentials) =>
  axios.post('/auth/register', user);

import { TSignInCredentials } from '@/types';
import { Token, TUser } from '@/types';
import { SignInResponse } from '@/types/response';

export const signIn = (user: TSignInCredentials): Promise<SignInResponse> =>
  axios.post('/auth/login', user);

export const saveUser = (user: TUser) =>
  fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(user),
  });

export const saveToken = (token: Token) =>
  fetch('/api/token', {
    method: 'POST',
    body: JSON.stringify(token),
  });
