export type CourseType = {
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  chapter: ChapterType[];
};

export type ChapterType = {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  position: number;
  isPublish: boolean;
  isFinal: boolean;
  isFree: boolean;
  courseId: string;
  createdAt: string;
  updatedAt: string;
};
