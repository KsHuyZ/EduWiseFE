import axios from '@/lib/axios';

import { TPayment } from '@/types';

export const payMent = (amount: number): Promise<TPayment> =>
  axios.get(`/payment/vn-pay?amount=${amount}&bankCode=NCB`);
