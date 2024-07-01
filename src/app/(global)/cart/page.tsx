'use client';
import React from 'react';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useUserCart } from '@/app/(global)/_hooks';
import Payment from '@/app/(global)/cart/_components/payment';
import TableCart from '@/app/(global)/cart/_components/table-cart';
import { useBuyCart } from '@/app/(global)/cart/_hooks';
import { formatPrice } from '@/utils';

const Cart = () => {
  const { data, isLoading } = useUserCart();

  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-cols-6 gap-2'>
        <Card className='col-span-4 shadow-md'>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='grid-cols-6 gap-2'>
                  <TableHead className='font-bold col-span-4'>Course</TableHead>
                  <TableHead className='font-bold'>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableCart data={data} isLoading={isLoading} />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className='shadow-md col-span-2 p-1 border-none bg-background/90 backdrop-blur-sm'>
          <CardContent className='flex flex-col space-y-4 my-4 divide-y p-2'>
            <div className='flex flex-col space-y-2'>
              <Label className='text-xl font-bold'>Coupon Code</Label>
              <div className='grid grid-cols-4 items-center gap-2'>
                <div className='col-span-3'>
                  <Input placeholder='Coupon code' className='w-full' />
                </div>
                <Button>Apply</Button>
              </div>
            </div>
            <div className='p-4 space-y-4'>
              <div className='flex flex-col p-1 space-y-1 '>
                <div className='flex justify-between items-center'>
                  <span>Cart subtotal</span> <span>{formatPrice(23000)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Discount</span> <span>-0</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-bold'>Cart Total</span>{' '}
                  <span className='text-xl font-bold'>
                    {data && data.length > 0
                      ? formatPrice(
                          data.reduce(
                            (current, course) =>
                              course.courseResponse.price + current,
                            0
                          )
                        )
                      : '0đ'}
                  </span>
                </div>
              </div>
              <Payment />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
