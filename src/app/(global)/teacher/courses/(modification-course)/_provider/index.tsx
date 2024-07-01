'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useLessons } from '@/app/(global)/teacher/courses/(modification-course)/create/_hook';
import { useCourseInfo } from '@/app/(global)/teacher/courses/(modification-course)/edit/info/[id]/hooks';
import { courseInitialValues } from '@/constant';
import { courseInfoSchema } from '@/validator';

import { CourseType, Lesson } from '@/types';

interface ICourseContext {
  formInfo: UseFormReturn<
    {
      name: string;
      price: number;
      description: string;
      descriptionShort: string;
      tags: {
        name: string;
        id: string;
      }[];
      categories: {
        name: string;
        id: string;
      }[];
      level: string;
      discount: number;
      file?: any;
    },
    any,
    undefined
  >;
  lessons?: Lesson[];
  lessonLoading: boolean;
  courseLoading: boolean;
  course?: CourseType;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  id: string;
}
const CourseContext = createContext<ICourseContext | undefined>(undefined);

export const useCourseForm = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const CourseProvider = ({ children }: { children: JSX.Element }) => {
  const formInfo = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
    defaultValues: courseInitialValues,
  });
  const { id } = useParams();
  const { data: lessons, isLoading: lessonLoading } = useLessons(id as string);
  const { data: course, isLoading: courseLoading } = useCourseInfo(
    id as string
  );
  const [isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    if (id && course) {
      const { file, name, price, description, tags, categories } = course;
      formInfo.reset({
        name,
        price,
        description,
        tags,
        categories,
        file,
      });
    }
  }, [id, course, formInfo]);

  return (
    <CourseContext.Provider
      value={{
        formInfo,
        lessonLoading,
        lessons,
        courseLoading,
        course,
        isPreview,
        setIsPreview,
        id: id as string,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
