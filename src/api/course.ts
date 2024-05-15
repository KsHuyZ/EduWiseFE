import axios from '@/lib/axios';

import {
  CategoryType,
  CourseCredentials,
  CourseType,
  Lesson,
  LessonCredentials,
  TagType,
} from '@/types';
import { TableApiResponse } from '@/types/response';

export const getTags = (title: string): Promise<TagType[]> =>
  axios.get(`/course/tags/${title}`);

export const getCategories = (title: string): Promise<CategoryType[]> =>
  axios.get(`/course/categories/${title}`);

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
    data.append(key, formatCourse[key]);
  });

  return axios.post('/course/create', data);
};

export const getCourses = (): Promise<TableApiResponse<CourseType[]>> =>
  axios.get('/course/get-all');

export const getCoursesLesson = (id: string): Promise<Lesson[]> =>
  axios.get(`/lesson/get-lessons?id=${id}`);

export const createLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  axios.post('/lesson/create', lesson);

export const updateLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  axios.post('/lesson/update', lesson);
