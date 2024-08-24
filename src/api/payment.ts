import axios from '@/lib/api';

import { TPayment } from '@/types';

export const payMent = (amount: number): Promise<TPayment> =>
  axios.get(`/payment/vn-pay?amount=${amount}&bankCode=NCB`);
