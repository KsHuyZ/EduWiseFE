import api from '@/lib/api';

import {
  ERoles,
  RefreshTokenResponse,
  SignInResponse,
  TSignInCredentials,
  TSignUpCredentials,
} from '@/types';

export const refreshToken = (
  refreshToken: string
): Promise<RefreshTokenResponse> =>
  api.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

export const signOut = () => api.get('/auth/logout');

export const signUp = (
  user: TSignUpCredentials & { role: ERoles.TEACHER | ERoles.STUDENT }
) => api.post('/auth/email/register', user);

export const signIn = (user: TSignInCredentials): Promise<SignInResponse> =>
  api.post('/auth/email/login', user);

export const googleSignIn = (idToken: string): Promise<SignInResponse> =>
  api.post('/auth/google/login', { idToken });
