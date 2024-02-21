import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params: { chapterId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const id = params.chapterId;
  return {
    title: id,
  };
}

const ChapterLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default ChapterLayout;
