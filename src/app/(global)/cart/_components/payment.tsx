'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { payMent } from '@/api';
import { validateError } from '@/utils';

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handlePayment = async () => {
    try {
      setLoading(true);
      const result = await payMent(20);
      location.replace(result.paymentUrl);
    } catch (error) {
      toast({ title: validateError(error), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPayment = () => {
    setOpen(true);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className='w-full' onClick={handleOpenPayment}>
        Pay now
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select payment method</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center space-x-8 relative'>
          {loading && (
            <div className='absolute w-full h-full bg-background/90 backdrop-blur-sm duration-200 flex justify-center items-center'>
              <div className='flex flex-col space-y-4 items-center'>
                <Spinner />
                <Label>Please wait...</Label>
              </div>
            </div>
          )}
          <div
            className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'
            onClick={handlePayment}
          >
            <Image
              src='/images/vnpay.webp'
              width={70}
              height={70}
              alt='vnpay'
            />
            <Label className='font-bold'>VNPay</Label>
          </div>
          <div className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'>
            <Image
              src='/images/metamask.png'
              width={70}
              height={70}
              alt='metamask'
            />
            <Label className='font-bold'>Metamask</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Payment;
