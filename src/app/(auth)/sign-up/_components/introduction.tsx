'use client';
import { CircleUser, SquareKanban } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import RegisterForm from '@/app/(auth)/sign-up/_components/register-form';
const Introduction = () => {
  const [currentPage, setCurrentPage] = useState<string>('none');

  const handleRender = (type: string) => {
    if (type === 'none') {
      return (
        <>
          <span>
            To explore the student features in detail, simply click on ‘Login as
            a student’. Else, click on ‘Login as an instructor’ to explore the
            instructor’s side of things.
          </span>
          <Button
            variant='outline'
            leftIcon={CircleUser}
            onClick={() => setCurrentPage('student')}
          >
            Login as student
          </Button>
          <Button
            leftIcon={SquareKanban}
            onClick={() => setCurrentPage('teacher')}
          >
            Login as Instructor
          </Button>
        </>
      );
    }
    return <RegisterForm type={type} goBack={() => setCurrentPage('none')} />;
  };

  return (
    <div className='flex flex-col space-y-4'>
      <h2>
        Welcome,{' '}
        {currentPage === 'none'
          ? 'Guest'
          : currentPage === 'student'
          ? 'Student'
          : 'Teacher'}
      </h2>
      {handleRender(currentPage)}
    </div>
  );
};

export default Introduction;
