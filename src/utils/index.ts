export const generateNameColor = (name: string) => {
  const hash = name.split('').reduce((accumulator, char) => {
    return char.charCodeAt(0) + ((accumulator << 5) - accumulator);
  }, 0);

  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  const paddedColor = '00000'.substring(0, 6 - color.length) + color;

  return `#${paddedColor}`;
};

export const validatError = (error: any) => {
  if (error && error?.data?.message) {
    return error.data.message;
  }
  return 'Something went wrong';
};
