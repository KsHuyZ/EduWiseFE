'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { createContext, useCallback, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { TeacherPath } from '@/constant';
import { useModificationCourse } from '@/feature/teacher/features/courses/components/tab-form/hooks';
import { validateError } from '@/utils';
import { courseInfoSchema, CreateCourseForm } from '@/validator';

import Tabs from './components/tabs';

interface IFormContext {
  onSubmit: () => void;
  isLoading: boolean;
  formInfo: UseFormReturn<CreateCourseForm, unknown, undefined>;
}

const FormContext = createContext<IFormContext | undefined>(undefined);

const TabForm = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const pathName = usePathname();
  const { isPending: courseInfoLoading, mutateAsync: modificationCourse } =
    useModificationCourse(id);
  const { toast } = useToast();
  const router = useRouter();
  const formInfo = useForm<CreateCourseForm>({
    resolver: zodResolver(courseInfoSchema),
  });

  const onSubmitFormInfo = useCallback(
    async (values: CreateCourseForm) => {
      const result = await formInfo.trigger();
      if (!result) return;
      try {
        const result = await modificationCourse({ ...values, id });
        router.push(TeacherPath.UpdateInfoCourse(result.id));
        toast({
          title: `${id ? 'Update' : 'Create'} course success!`,
          variant: 'success',
        });
      } catch (error) {
        toast({ title: validateError(error), variant: 'destructive' });
      }
    },
    [formInfo, id, modificationCourse, router, toast]
  );

  const onSubmit = useCallback(() => {
    if (
      pathName === TeacherPath.UpdateInfoCourse(id) ||
      pathName === TeacherPath.CreateInfoCourse
    ) {
      const formValues = formInfo.getValues();
      return onSubmitFormInfo(formValues);
    }
  }, [formInfo, id, onSubmitFormInfo, pathName]);
  return (
    <FormContext.Provider
      value={{ onSubmit, isLoading: courseInfoLoading, formInfo }}
    >
      <div className='flex flex-col space-y-4'>
        <div className='flex space-x-2 justify-end'>
          <Button variant='secondary' disabled={!id}>
            Preview
          </Button>
          <Button
            isLoading={courseInfoLoading}
            disabled={!formInfo.formState.isDirty || courseInfoLoading}
            onClick={onSubmit}
          >
            Save and update
          </Button>
        </div>
        <Tabs />
        {children}
      </div>
    </FormContext.Provider>
  );
};

export const useFormCourseContext = (): IFormContext => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default TabForm;
