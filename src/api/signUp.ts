import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-up/types';

const teacherSignUp = (user: UserCredentials) =>
  axios.post('/auth/register-teacher', user);

export default teacherSignUp;
