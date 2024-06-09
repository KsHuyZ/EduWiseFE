import { useQuery } from '@tanstack/react-query';

import { getUserCart } from '@/api';

export const useUserCart = () =>
  useQuery({ queryKey: ['user'], queryFn: getUserCart });
