import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-in/types/usercredential';

import { SignInResponse } from '@/types/response';

const signIn = (user: UserCredentials): Promise<SignInResponse> =>
  axios.post('/auth/login', user);

export default signIn;
