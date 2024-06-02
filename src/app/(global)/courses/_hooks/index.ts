import { useQuery } from '@tanstack/react-query';

import { getAllCourseCategories, getCourses } from '@/api';

export const useCourse = (
  sortBy: string | null,
  priceMin: string | null,
  priceMax: string | null,
  keyword: string | null
) =>
  useQuery({
    queryKey: ['teacher-course', sortBy, priceMin, priceMax, priceMax, keyword],
    queryFn: () => getCourses(sortBy, priceMin, priceMax, keyword),
  });

export const useCategory = () =>
  useQuery({ queryKey: ['category'], queryFn: getAllCourseCategories });
