import axios from '@/lib/axios';

import { TQuestion, TQuizCredentials } from '@/types';

export const createQuiz = (quiz: TQuizCredentials) =>
  axios.post('/quiz/create-group', quiz);

export const getQuizByUnitId = (id?: string) =>
  axios.get(`/quiz/getListQuizByIdUnit?id=${id}`);

export const getQuestionByQuizId = (id?: string): Promise<TQuestion[]> =>
  axios.get(`/question/get-by-quiz-id?id=${id}`);
