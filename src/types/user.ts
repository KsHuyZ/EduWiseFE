export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export type TSignInCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type TSignUpCredentials = {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
};
