import axios from '@/lib/axios';

import { CourseType } from '@/types';

export const getUserCart = (): Promise<CourseType[]> =>
  axios.get('/cart/get-by-user-id');

export const removeCartItem = (id: string) =>
  axios.delete(`/cart/delete-by-cart-id?idCart=${id}`);

export const createCartItem = (id: string) => axios.post(`/cart/add?${id}`);
