'use client';

import { LogIn, LogOutIcon, Settings } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

import Cart from '@/app/(global)/components/navbar/components/cart';
import SettingTheme from '@/app/(global)/components/navbar/components/setting-theme';

import { TUser } from '@/types';

const NavbarRoutes = ({ user }: { user?: TUser }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    // await signOut();
    await router.replace('/sign-in');
    await deleteCookie('user');
    await deleteCookie('token');
  };

  return (
    <div className='ml-auto flex gap-x-2'>
      <div className='flex items-center space-x-4'>
        <Cart />
        <SettingTheme />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={!user?.avatar ? '/images/avatar.jpg' : user.avatar}
                width={50}
                height={50}
                alt='avatar'
                className='rounded-full border p-1'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className='flex flex-col space-y-2 px-2'>
                <Label className='font-bold leading-5'>
                  {cn(user.firstName, user.lastName)}
                </Label>
                <span className='text-sm'>{user.email}</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <div className='gap-x-2 flex items-center'>
                  <Settings size={15} />
                  <span>Setting</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <div className='gap-x-2 flex items-center text-red-600'>
                  <LogOutIcon size={15} />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant='outline' onClick={() => router.push('/sign-in')}>
            <div className='flex items-center space-x-2'>
              <LogIn />
              <span>Login</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarRoutes;
