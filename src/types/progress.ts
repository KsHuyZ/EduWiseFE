import { TUnit } from '@/types/course';

export type TCourseProgress = {
  id: string;
  lessonResponseList: { id: string; listUnit: TUnit[] }[];
};
