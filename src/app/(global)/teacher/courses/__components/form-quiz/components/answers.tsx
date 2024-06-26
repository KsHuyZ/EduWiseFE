import { Plus, Trash } from 'lucide-react';
import React from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { TQuestionCredential } from '@/types';

interface AnswerProps {
  questionIndex: number;
  control: Control<{ questions: TQuestionCredential[] }, unknown>;
  register: UseFormRegister<{ questions: TQuestionCredential[] }>;
  errors: FieldErrors<{
    questions: {
      lessonId: string;
      title: string;
      choices: {
        content: string;
        correct: boolean;
      }[];
    }[];
  }>;
}

const Answers = ({ questionIndex, control, register, errors }: AnswerProps) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const handleAddAnswer = () => {
    const additionalAnswer = {
      correct: false,
      content: '',
    };
    append(additionalAnswer);
  };

  const handleChecked = (value: boolean, k: number) => {
    update(k, { ...fields[k], correct: value, id: undefined });
  };

  return (
    <div className='flex flex-col space-y-1.5' key={Math.random()}>
      <Label htmlFor='name'>Answer</Label>
      {fields.map((answer, k) => (
        <div className='flex flex-col space-y-1.5' key={Math.random()}>
          <div className='flex items-center w-full space-x-2 space-y-2'>
            <Checkbox
              checked={answer.correct}
              onCheckedChange={(value: boolean) => handleChecked(value, k)}
            />{' '}
            <Input
              id='name'
              placeholder='Eg: Javascript'
              className='w-full'
              {...register(`questions.${questionIndex}.choices.${k}.content`, {
                required: true,
              })}
            />
            <div
              className='cursor-pointer p-2 hover:bg-gray-300 rounded transition'
              onClick={() => remove(k)}
            >
              <Trash className='h-5 w-5 text-gray-500' />
            </div>
          </div>
          {errors.questions &&
            errors.questions[questionIndex] &&
            errors.questions[questionIndex]?.choices && (
              <span className='text-red-500'>
                {
                  errors.questions[questionIndex]?.choices?.[k]?.content
                    ?.message
                }
              </span>
            )}
        </div>
      ))}
      <div className='flex justify-center items-center'>
        <div
          className='flex space-x-2 hover:bg-gray-400 transition p-2 rounded cursor-pointer'
          onClick={handleAddAnswer}
        >
          <Plus />
        </div>
      </div>
    </div>
  );
};

export default Answers;
