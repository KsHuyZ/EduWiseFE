export enum Path {
  HOME = '/',
  ABOUT = '/about',
  SIGNIN = '/sign-in',
  SIGNUP = 'sign-up',
}
export const TeacherPath = {
  CreateInfoCourse: '/teacher/courses/create/info',
  UpdateInfoCourse: (id: string) => `/teacher/courses/edit/lesson/${id}`,
};
