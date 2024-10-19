import { CreateCourseForm } from '@/validator';

import { ELevel, EStatus, ICategory, ITag, TQuiz, TUser } from '@/types';

export type CourseCredentials = {
  id?: string;
} & CreateCourseForm;
export type CourseType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categories: ICategory[];
  descriptionShort: string;
  tags: ITag[];
  chapters?: Lesson[];
  userResponse: TUser;
};

export type TCourse = {
  id: string;
  image: string;
  name: string;
  videoPreview: string;
  description: string;
  shortDescription: string;
  createdBy: TUser;
  level: ELevel;
  status: EStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  price: number;
  duration: number;
};

export type TVideo = {
  id: string;
  title: string;
  content: string;
  url: string;
  idUnit: boolean;
  description: string;
};

export type LessonCredentials = {
  id?: string;
  title: string;
  content?: string;
  idCourse?: string;
};

export enum EUnitType {
  VIDEO = 'video',
  QUIZ = 'quiz',
}

export type TUnit = {
  id: string;
  idLesson: string;
  title: string;
  ordinalNumber: number;
  type: EUnitType;
  video?: TVideo;
  quizResponse?: TQuiz;
};

export type Lesson = {
  id: string;
  ordinalNumber?: number;
  isPublish?: boolean;
  units: TUnit[];
} & LessonCredentials;

export type TVideoCredentials = {
  title: string;
  file?: File;
  idLesson: string;
  description: string;
};

export enum ECourseStatus {
  CREATE = 'on_create',
  PUBLIC = 'public',
  PRIVATE = 'private',
  DELETE = 'delete',
}
