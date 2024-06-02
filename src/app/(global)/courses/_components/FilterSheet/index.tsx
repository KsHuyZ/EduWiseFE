'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const formSchema = z.object({
  priceMin: z.string(),
  priceMax: z.string(),
});

const FilterSheet = () => {
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { replace } = useRouter();
  const pathname = usePathname();

  const createQueriesString = useCallback(
    (values: { name: string; value: string | null }[]) => {
      const params = new URLSearchParams(searchParams);
      values.forEach(({ name, value }) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });
      return replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );

  const onSubmit = async () => {
    await form.trigger();
    const values = form.getValues();
    const { priceMax, priceMin } = values;
    createQueriesString([
      { name: 'priceMax', value: priceMax.toString() },
      { name: 'priceMin', value: priceMin.toString() },
    ]);
  };

  const onClear = () => {
    form.reset();
    createQueriesString([
      { name: 'priceMax', value: null },
      { name: 'priceMin', value: null },
    ]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <div className='flex items-center space-x-2'>
            <ListFilter className='w-4 h-4' />
          </div>
          <span>Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='w-72'>
        <SheetHeader className='border-b pb-4 mb-4'>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col space-y-4 items-start'>
          <Form {...form}>
            <form className='space-y-4'>
              <FormField
                control={form.control}
                name='priceMin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='9$'
                        type='number'
                        leftIcon={DollarSign}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='priceMax'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='9$'
                        type='number'
                        leftIcon={DollarSign}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className='absolute mx-8 my-4 inset-x-0 bottom-0 flex justify-between items-center'>
          <Button variant='outline' onClick={onClear}>
            Clear
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
