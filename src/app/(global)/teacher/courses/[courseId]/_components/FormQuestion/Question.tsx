import React from 'react';

import Input from '@/components/inputs/Input';
import { Label } from '@/components/ui/label';

const Question = ({ index }: { index: number }) => {
  return (
    <form>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-6'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Question {index + 1}</Label>
            <Input
              id='name'
              placeholder="Eg: 'What is programing language console.log('Hello World')?"
              value={question.title}
            />
          </div>
          {question.answers.map((answer) => (
            <div className='flex flex-col space-y-1.5' key={Math.random()}>
              <Label htmlFor='name'>Answer</Label>
              <div className='flex items-center w-full space-x-2'>
                <Checkbox />{' '}
                <Input
                  id='name'
                  placeholder='Eg: Javascript'
                  className='w-full'
                  value={answer.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Question;
