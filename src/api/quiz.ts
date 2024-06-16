import axios from '@/lib/axios';

import {
  TQuestionResponse,
  TQuizCredentials,
  TQuizSubmitResults,
} from '@/types';

export const createQuiz = (quiz: TQuizCredentials) =>
  axios.post('/quiz/create-group', quiz);

export const getQuizByUnitId = (id?: string) =>
  axios.get(`/quiz/getListQuizByIdUnit?id=${id}`);

export const getQuestionByQuizId = (
  id?: string
): Promise<TQuestionResponse[]> =>
  axios.get(`/question/get-by-quiz-id?id=${id}`);

export const submitQuiz = (values: TQuizSubmitResults) =>
  axios.post('/quiz-results/submit', values);
