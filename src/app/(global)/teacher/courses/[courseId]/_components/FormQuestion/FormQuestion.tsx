import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import Answers from '@/app/(global)/teacher/courses/[courseId]/_components/FormQuestion/components/Answers';

import { Question } from '@/types';

const initialQuestions: Question[] = [
  {
    lessonId: Math.random().toString(),
    title: '',
    answers: [
      {
        correct: true,
        title: '',
        questionId: Math.random().toString(),
      },
    ],
  },
];

const answerSchema = z.object({
  title: z.string(),
  correct: z.boolean(),
  questionId: z.string(),
});

const questionSchema = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(1, { message: 'Title question is required' }),
  answers: z.array(answerSchema),
});

const formSchema = z.object({
  questions: z.array(questionSchema),
});

const FormQuestion = () => {
  const { control, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { questions: initialQuestions },
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  return (
    <div className='w-full flex flex-col space-y-6'>
      {fields.map((question, index) => (
        <Card key={question.id} className='w-full shadow-md'>
          <CardHeader>
            <CardTitle className='flex justify-between align-middle border-b border-gray-300'>
              <span>Question {index + 1}</span>
              <div className='flex space-x-2'>
                <div
                  className='cursor-pointer p-2 hover:bg-gray-300 rounded transition'
                  onClick={() => remove(index)}
                >
                  <Trash className='h-5 w-5 text-gray-500' />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-6'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>Question</Label>
                    <Input
                      id='name'
                      placeholder="Eg: 'What is programing language console.log('Hello World')?"
                      {...register(`questions.${index}.title`)}
                    />
                  </div>
                  <Answers
                    questionIndex={index}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
      <Card className='p-2 shadow-md'>
        <div className='flex justify-center items-center'>
          <div
            className='flex space-x-2 hover:bg-gray-400 transition p-2 rounded cursor-pointer'
            onClick={() => append(initialQuestions)}
          >
            <Plus /> <span>Add Question</span>
          </div>
        </div>
      </Card>
      <div className=' flex justify-end'>
        <Button type='submit'>Submit</Button>
      </div>
    </div>
  );
};

export default FormQuestion;
