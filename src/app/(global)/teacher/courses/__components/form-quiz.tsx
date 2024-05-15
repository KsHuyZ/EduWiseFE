import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  title: z.string().min(1, { message: 'Title question is required' }),
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

const FormQuiz = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { questions: initialQuestions },
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: {
      required: true,
    },
  });
  const onSubmit = async () => {
    const isValid = await trigger();
    console.log(getValues(), isValid);
  };
  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Quiz
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
          </DialogHeader>
          <div className='w-full flex flex-col space-y-6 h-[400px] overflow-y-scroll no-scrollbar'>
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
                          {errors.questions
                            ? errors.questions[index]?.title?.message && (
                                <span className='text-red-500'>
                                  {errors.questions[index]?.title?.message}
                                </span>
                              )
                            : null}
                        </div>
                        <Answers
                          questionIndex={index}
                          control={control}
                          register={register}
                          errors={errors}
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
          </div>
          <DialogFooter>
            <Button type='submit' onClick={onSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormQuiz;
