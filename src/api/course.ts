import axios from '@/lib/axios';

import {
  CourseCredentials,
  CourseType,
  ICategory,
  Lesson,
  LessonCredentials,
  TVideoCredentials,
} from '@/types';
import { TableApiResponse } from '@/types/response';

type CourseCredentialOverride = Omit<
  CourseCredentials,
  'tags' | 'categories'
> & { tags: string[]; categories: string[] };

export const createCourses = (
  course: CourseCredentials
): Promise<CourseType> => {
  const tags = course.tags.map((tag) => tag.name);
  const categories = course.categories.map((tag) => tag.name);
  const formatCourse = {
    ...course,
    tags,
    categories,
  } as CourseCredentialOverride;
  const data = new FormData();
  Object.keys(formatCourse).forEach((key) => {
    data.append(key, formatCourse[key as keyof CourseCredentialOverride]);
  });

  return axios.post('/course/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateCourses = (
  course: CourseCredentials
): Promise<CourseType> => {
  const tags = course.tags.map((tag) => tag.name);
  const categories = course.categories.map((tag) => tag.name);
  const formatCourse = {
    ...course,
    tags,
    categories,
  } as CourseCredentialOverride;
  const data = new FormData();
  Object.keys(formatCourse).forEach((key) => {
    data.append(key, formatCourse[key as keyof CourseCredentialOverride]);
  });

  return axios.put('/course/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getCourses = (
  sort: string | null,
  priceMin: string | null,
  priceMax: string | null,
  keyword: string | null
): Promise<TableApiResponse<CourseType[]>> =>
  axios.get('/course/get-all', {
    params: {
      sort,
      priceMin,
      priceMax,
      keyword,
    },
  });

export const getTeacherCourses = (): Promise<CourseType[]> =>
  axios.get(`/course/get-by-teacher`);

export const getCoursesLesson = (id: string): Promise<Lesson[]> =>
  axios.get(`/lesson/get-lessons?id=${id}`);

export const createLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  axios.post('/lesson/create', lesson);

export const updateLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  axios.put(`/lesson/update/${lesson.id}`, {
    title: lesson.title,
    content: lesson.content,
  });

export const getAllCourseCategories = (): Promise<ICategory[]> =>
  axios.get('/course/categories/get-all');

export const getLessonByCourseId = (id: string): Promise<Lesson[]> =>
  axios.get(`/lesson/get-lessons?id=${id}`);
export const getCourseById = (id: string): Promise<CourseType> =>
  axios.get(`/course/get-by-id?id=${id}`);

export const deleteLessonById = (id: string) =>
  axios.delete('/lesson/delete', {
    data: id,
  });

type TKeyVideo = keyof TVideoCredentials;

export const createVideo = (video: TVideoCredentials) => {
  const data = new FormData();
  Object.keys(video).forEach((key) => {
    data.append(key, video[key as TKeyVideo]);
  });
  return axios.post('/video/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMyCourse = (): Promise<CourseType[]> =>
  axios.get('/course/get-by-user');
