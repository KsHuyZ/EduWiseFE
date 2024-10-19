import { useQuery } from '@tanstack/react-query';

import { getCategoriesByName, getTagsByName } from '@/api';
import { QueryKey } from '@/constant';

export const useTags = (title: string) =>
  useQuery({
    queryKey: [QueryKey.TAG, title],
    queryFn: () => getTagsByName(title),
    enabled: !!title,
  });

export const useCategory = (title: string) =>
  useQuery({
    queryKey: [QueryKey.CATEGORY, title],
    queryFn: () => getCategoriesByName(title),
    enabled: !!title,
  });
