import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-up/types';

const signUp = (user: UserCredentials) => axios.post('/auth/register', user);

export default signUp;
