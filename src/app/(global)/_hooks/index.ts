import { useQuery } from '@tanstack/react-query';

import { getMyCourse } from '@/api';

export const useMyCourse = () =>
  useQuery({ queryKey: ['my-course'], queryFn: getMyCourse });
