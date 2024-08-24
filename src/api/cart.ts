import axios from '@/lib/api';

import { TCartBuyAll, TCartResponse } from '@/types';

export const getUserCart = (): Promise<TCartResponse[]> =>
  axios.get('/cart/get-by-user-id');

export const removeCartItem = (id: string) =>
  axios.delete(`/cart/delete-by-cart-id?idCart=${id}`);

export const createCartItem = (id: string) =>
  axios.post(`/cart/add?idCourse=${id}`);

export const buyAllCart = (): Promise<TCartBuyAll> =>
  axios.post('/cart/buy-all');
