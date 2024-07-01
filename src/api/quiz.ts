import axios from '@/lib/axios';

import { TQuestionResponse, TQuestionResults, TQuizCredentials } from '@/types';

export const createQuiz = (quiz: TQuizCredentials) =>
  axios.post('/quiz/create-group', quiz);

export const getQuizByUnitId = (id?: string) =>
  axios.get(`/quiz/getListQuizByIdUnit?id=${id}`);

export const getQuestionByQuizId = (
  id?: string
): Promise<TQuestionResponse[]> =>
  axios.get(`/question/get-by-quiz-id?id=${id}`);

export const submitQuiz = (values: {
  quizId: string;
  questionResultRequestList: TQuestionResults[];
}): Promise<{ score: string; isFinal: boolean; isPass: boolean }> =>
  axios.post('/quiz-results/submit', values);
