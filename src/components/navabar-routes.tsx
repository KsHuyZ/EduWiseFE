'use client';

import { useFormik } from 'formik';
import { LogInIcon, LogOutIcon, Moon, Settings, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import teacherSignUp from '@/api/signUp';
import { UserCredentials } from '@/app/(auth)/sign-up/types';
import { generateNameColor, validateError } from '@/utils';

import { UserType } from '@/types';

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

const initialValues: UserCredentials = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const NavbarRoutes = ({ user }: { user?: UserType }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.startsWith('/courses');
  const isSearchPage = pathname === '/search';

  const onSubmit = async (values: UserCredentials) => {
    try {
      setLoading(true);
      await teacherSignUp(values);
      toast.success('Sign up success');
      router.replace('/sign-in');
    } catch (error: any) {
      if (validateError(error)) {
        toast.error(validateError(error));
        const { email, firstName, lastName, password, passwordConfirm } =
          error.items as UserCredentials;
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
    } finally {
      setLoading(false);
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
        <Sheet>
          <SheetTrigger asChild>
            <Settings className='animate-spin-slow cursor-pointer text-gray-500' />
          </SheetTrigger>
          <SheetContent className='bg-white'>
            <SheetHeader className='border-b pb-6 border-dashed'>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col space-y-8 items-center my-6'>
              <div className='flex flex-col space-y-4 w-full'>
                <Label>Mode</Label>
                <div className='flex items-center justify-between '>
                  <div className='group p-8 px-14 border border-dashed rounded cursor-pointer hover:border-primary-600 hover:bg-primary-100 duration-300'>
                    <Sun className='transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 duration-300 group-hover:text-primary-600' />
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
            </SheetFooter>
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
                <div className='gap-x-2 flex items-center'>
                  <LogOutIcon size={15} />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant='light'
            leftIcon={LogInIcon}
            onClick={() => router.push('/sign-in')}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarRoutes;
