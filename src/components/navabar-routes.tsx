import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import Button from '@/components/buttons/Button';
import { generateNameColor } from '@/utils';

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.startsWith('/courses');
  const isSearchPage = pathname === '/search';

  const userName = 'Hong Phan';
  const color = generateNameColor(userName);

  return (
    <div className='flex gap-x-2 ml-auto'>
      {isTeacherPage || isCoursePage ? (
        <Link href='/'>
          <Button variant='ghost'>
            <LogOut className='h-4 w-4 mr-2' />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button variant='ghost'>Teacher mode</Button>
        </Link>
      )}
      <div
        className='flex items-center justify-center w-8 h-8 text-white rounded-full'
        style={{ background: color }}
      >
        {userName.charAt(0)}
      </div>
    </div>
  );
};

export default NavbarRoutes;
