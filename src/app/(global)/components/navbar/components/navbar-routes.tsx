'use client';

import { useFormik } from 'formik';
import {
  LogIn,
  LogOutIcon,
  Maximize,
  Minimize,
  Moon,
  Settings,
  ShoppingCart,
  Sun,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/hooks/useThemeColor';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { teacherSignUp } from '@/api';
import { presetColors } from '@/constant';
import { generateNameColor, validateError } from '@/utils';

import { TSignUpCredentials, TUser } from '@/types';

const { object, string } = Yup;

const validationSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email('Invalid email format').required('Email is required'),
  password: string().required('Password is required'),
  passwordConfirm: string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password confirm is required'),
});

const initialValues: TSignUpCredentials = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const NavbarRoutes = ({ user }: { user?: TUser }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { toggleTheme, theme: themeColor } = useThemeStore();

  // const isTeacherPage = pathname?.startsWith('/teacher');
  // const isCoursePage = pathname?.startsWith('/courses');
  // const isSearchPage = pathname === '/search';

  const onSubmit = async (values: TSignUpCredentials) => {
    try {
      await teacherSignUp(values);
      toast.success('Sign up success');
      router.replace('/sign-in');
    } catch (error: any) {
      if (validateError(error)) {
        toast.error(validateError(error));
        const { email, firstName, lastName, password, passwordConfirm } =
          error.items as TSignUpCredentials;
        if (email) {
          formik.setFieldError('email', email);
        }
        if (firstName) {
          formik.setFieldError('firstName', firstName);
        }
        if (lastName) {
          formik.setFieldError('lastName', lastName);
        }
        if (password) {
          formik.setFieldError('password', password);
        }
        if (passwordConfirm) {
          formik.setFieldError('passwordConfirm', passwordConfirm);
        }
      }
    }
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
    validateOnChange: false,
  });
  const handleSignOut = async () => {
    // await signOut();
    router.replace('/sign-in');
    await deleteCookie('user');
    await deleteCookie('token');
  };

  const toggleFullScreen = async (): Promise<void> => {
    const element = document.body;
    const isFullScreen = document.fullscreenElement;
    if (isFullScreen === null) {
      await element?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const onSelectThemeColor = (color: string): void => {
    toggleTheme(color);
  };

  return (
    <div className='ml-auto flex gap-x-2'>
      {/* {isTeacherPage || isCoursePage ? (
        <Link href='/'>
          <Button variant='ghost'>
            <LogOut className='mr-2 h-4 w-4' />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button variant='ghost'>Teacher mode</Button>
        </Link>
      )} */}
      <div className='flex items-center space-x-4'>
        <ShoppingCart className='cursor-pointer text-gray-500' />
        <Sheet>
          <SheetTrigger asChild>
            <Settings className='animate-spin-slow cursor-pointer text-gray-500' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className='border-b pb-6 border-dashed'>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col space-y-8 items-center my-6'>
              <div className='flex flex-col space-y-4 w-full'>
                <Label>Mode</Label>
                <div className='flex items-center justify-between '>
                  <div
                    className={cn(
                      'group p-8 px-14 border border-dashed rounded cursor-pointer hover:border-primary-600 hover:bg-primary-100 hover:text-primary-600 duration-300',
                      theme === 'light'
                        ? 'border-primary-600 bg-primary-100 text-primary-600'
                        : ''
                    )}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className='transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 duration-300 group-hover:text-primary-600' />
                  </div>
                  <div
                    className={cn(
                      'group p-8 px-14 border border-dashed rounded cursor-pointer hover:border-primary-600 hover:bg-primary-100 duration-300',
                      theme === 'dark'
                        ? 'border-primary-600 bg-primary-100 text-primary-600'
                        : ''
                    )}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className='transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 duration-300 group-hover:text-primary-600' />
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-4 w-full'>
                <Label>Theme</Label>
                <div className='grid grid-cols-3 gap-3'>
                  {presetColors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => onSelectThemeColor(color.label)}
                      className={cn(
                        'cursor-pointer p-2 px-1 border rounded-sm flex justify-center items-center group hover: hover:scale-110 duration-300',
                        `hover:border-[${color.primary}]`,
                        themeColor === color.label
                          ? `border-[${color.primary}] bg-slate-100 dark:`
                          : ''
                      )}
                    >
                      <div
                        style={{ backgroundColor: color.primary }}
                        className={cn(
                          'w-4 h-4 m-2 rounded-full group-hover:scale-110 duration-300'
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              className='absolute mx-8 my-4 inset-x-0 bottom-0 outline-none'
              variant='outline'
              type='submit'
              onClick={toggleFullScreen}
            >
              <div className='flex space-x-2 items-center justify-center'>
                {!isFullScreen ? <Maximize /> : <Minimize />}
                <span>Full Screen</span>
              </div>
            </Button>
          </SheetContent>
        </Sheet>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className='flex h-8 w-8 items-center justify-center rounded-full text-white'
                style={{
                  background: generateNameColor(
                    cn(user.firstName, user.lastName)
                  ),
                }}
              >
                {cn(user.firstName, user.lastName).charAt(0)}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => toast.error('This function is not availble')}
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
