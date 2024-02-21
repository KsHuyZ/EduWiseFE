import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';

const Courses = () => {
  return (
    <div className='p-6'>
      <Link href='/teacher/create'>
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default Courses;
