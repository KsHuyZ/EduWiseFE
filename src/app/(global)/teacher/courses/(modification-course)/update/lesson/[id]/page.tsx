'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import { ChaptersForm } from '@/app/(global)/teacher/courses/__components/chapter-form';

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  return <ChaptersForm idCourse={id} />;
};

export default LessonPage;
