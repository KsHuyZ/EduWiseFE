import { ICategory, ImageType, ITag } from '@/types';

export type CourseCredentials = {
  name: string;
  description: string;
  level: string;
  discount: number;
  price: number | string;
  tags: ITag[];
  categories: ICategory[];
  file?: FileList | null;
  status?: string;
};

export type CourseType = {
  id: string;
  name: string;
  price: number;
  description: string;
  file: ImageType;
  categories: ICategory[];
  tags: ITag[];
  chapters?: Lesson[];
};

export type Video = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  preview: boolean;
  type: 'video' | 'quiz';
};

export type LessonCredentials = {
  id?: string;
  title: string;
  content?: string;
  idCourse?: string;
};

export type Lesson = {
  id: string;
  ordinalNumber?: number;
  isPublish?: boolean;
  videos: Video[];
} & LessonCredentials;
