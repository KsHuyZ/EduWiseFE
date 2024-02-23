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
