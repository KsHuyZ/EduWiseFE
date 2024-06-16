import axios from '@/lib/axios';

export const enrollCourse = (id: string) =>
  axios.post(`/enrollment/enroll?idCourse=${id}`);
