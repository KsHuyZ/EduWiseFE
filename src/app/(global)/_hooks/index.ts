import { useQuery } from '@tanstack/react-query';

import {
  getMyCourse,
  getQuestionByQuizId,
  getQuizByUnitId,
  getUserCart,
} from '@/api';

import { EUnitType } from '@/types';

export const useMyCourse = () =>
  useQuery({ queryKey: ['my-course'], queryFn: getMyCourse });

export const useUserCart = () =>
  useQuery({ queryKey: ['user-cart'], queryFn: getUserCart });

export const useQuiz = (id?: string, type?: string) =>
  useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizByUnitId(id),
    enabled: !!id && type === EUnitType.QUIZ,
  });

export const useQuestion = (id?: string, type?: string) =>
  useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionByQuizId(id),
    enabled: !!id && type === EUnitType.QUIZ,
  });
