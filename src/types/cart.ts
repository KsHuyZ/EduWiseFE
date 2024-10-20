import { TCourse, TUser } from '@/types';

export type TCartResponse = {
  courseResponse: TCourse;
  id: string;
  status: string;
  userResponse: TUser;
};

export type TCartBuyAll = {
  redirect_url: string;
};
