import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params: { courseId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  // read route params
  const id = params.courseId;
  return {
    title: id,
  };
}

const CourseLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default CourseLayout;
