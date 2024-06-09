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
        value: !id ? 'create/info' : `edit/info/${id}`,
      },
      {
        label: 'Lesson',
        value: `edit/lesson/${id}`,
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
            value={`/teacher/courses/${tab.value}`}
            disabled={tab.value.includes('lesson') && !id}
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
