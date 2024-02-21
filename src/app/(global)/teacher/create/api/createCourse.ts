export const createCourse = (title: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(title);
    }, 2000);
  });
};
