import axios from '@/lib/api';

export const enrollCourse = (id: string) =>
  axios.post(`/enrollment/add-to-enrollment?idCourse=${id}`);
