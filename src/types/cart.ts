import { CourseType, TUser } from '@/types';

export type TCartResponse = {
  courseResponse: CourseType;
  id: string;
  status: string;
  userResponse: TUser;
};

export type TCartBuyAll = {
  redirect_url: string;
};
