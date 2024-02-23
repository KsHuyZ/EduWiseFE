import axios from '@/lib/axios';

import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';

const teacherSignUp = (user: UserCredentials) =>
  axios.post('/auth/teacher-register', user);

export default teacherSignUp;
