import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { __courseMock } from '@/__mocks__';
import Payment from '@/app/(global)/cart/_components/payment';
import { formatPrice } from '@/utils';

const Cart = () => {
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
                {__courseMock.map((course) => (
                  <TableRow
                    key={course.id}
                    className='grid-cols-6 gap-2 items-center'
                  >
                    <TableCell className='font-medium col-span-4'>
                      <div className='flex items-center justify-between cursor-pointer duration-200 p-2 rounded-sm'>
                        <div className='flex items-center space-x-2'>
                          <Image
                            src='/images/spider.jpg'
                            width={100}
                            height={100}
                            alt='COurse img'
                            className='rounded-md overflow-hidden'
                          />
                          <div className='flex flex-col space-y-2'>
                            <Label>{course.title}</Label>
                            <div className='flex items-center space-x-2'>
                              <span>Author:</span>
                              <span className='text-sm'>Phan Tien huy</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatPrice(course.price)}</TableCell>
                    <TableCell>
                      <Button variant='ghost'>
                        <X size={15} className='text-gray-500' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
                    {formatPrice(18000)}
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
