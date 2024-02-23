import React from 'react';

import { Banner } from '@/components/banner';

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const requiredFields = ['', '', '', 0, ''];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields} / ${totalFields}`;

  return (
    <>
      <Banner label='This course is unpublished. It will not be visible to the students.' />
      <div className='p-6'>
        c
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className=''>
            <div className='mt-6 p-4 w-full'>
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
