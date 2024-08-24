import axios from '@/lib/api';

import { TUser } from '@/types';

export const getMe = (): Promise<TUser> => axios.get('/account/me');
