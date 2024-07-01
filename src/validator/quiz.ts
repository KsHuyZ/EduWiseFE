import { z } from 'zod';

export const answerSchema = z.object({
  content: z.string({ required_error: 'Title question is required' }),
  correct: z.boolean(),
});

export const questionSchema = z.object({
  content: z.string({ required_error: 'Title question is required' }),
  description: z.string(),
  level: z.number(),
  choices: z.array(answerSchema),
});

export const formSchema = z.object({
  questions: z.array(questionSchema),
});

export const quizGroupSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
    })
    .trim(),
  description: z
    .string({
      required_error: 'Description is required!',
    })
    .trim(),
  isFinalExam: z.boolean(),
  time: z.date(),
});
