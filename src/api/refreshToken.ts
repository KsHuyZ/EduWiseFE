import axios from '@/lib/axios';

import { RefreshTokenResponse } from '@/types/response';

const refreshTokenApi = (refreshToken: string): Promise<RefreshTokenResponse> =>
  axios.post('/auth/refresh', {
    refreshToken,
  });
export default refreshTokenApi;
