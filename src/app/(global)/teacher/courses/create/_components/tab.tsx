'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ITab {
  children: React.ReactNode;
}

const Tab = ({ children }: ITab) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathName = usePathname();

  const tabList = useMemo(
    () => [
      {
        label: 'Course info',
        value: 'info',
      },
      {
        label: 'Lesson',
        value: `lesson/${id}`,
      },
    ],
    [id]
  );

  return (
    <Tabs value={pathName} onValueChange={(value) => router.push(`${value}`)}>
      <TabsList className='grid w-full grid-cols-2 mb-6'>
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={`/teacher/courses/create/${tab.value}`}
            disabled={tab.value.startsWith('lesson') && !id}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Tab;
