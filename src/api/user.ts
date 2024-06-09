import axios from '@/lib/axios';

import { TUser } from '@/types';

export const getMe = (): Promise<TUser> => axios.get('/account/me');
