import { Token } from '@/types/token';
import { UserType } from '@/types/user';

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expires: { token: number; refreshToken: number };
};
export type SignInResponse = {
  expiresIn: {
    token: number;
    refreshToken: number;
  };
  userResponse: UserType;
} & Token;

export type TableApiResponse<T> = {
  page: number;
  pages: number;
  size: number;
  total: number;
  items: T;
};
