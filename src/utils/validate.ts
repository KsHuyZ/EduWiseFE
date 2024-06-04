// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateError = (error: any) => {
  if (error && error.data) {
    return error.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Something went wrong';
};
