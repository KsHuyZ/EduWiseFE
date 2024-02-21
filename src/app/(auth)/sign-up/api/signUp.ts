import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';

const signUp = (user: UserCredentials) => axios.post('/auth/register', user);

export default signUp;
