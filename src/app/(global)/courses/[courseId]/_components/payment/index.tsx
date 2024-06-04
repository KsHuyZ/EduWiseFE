'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import { payMent } from '@/api';

interface IPaymentProps {
  amount: number;
}

const PayMent = ({ amount }: IPaymentProps) => {
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    const result = await payMent(amount);
    location.replace(result.paymentUrl);
    setLoading(false);
  };
  return (
    <Button variant='outline' onClick={handlePayment} isLoading={loading}>
      Buy now
    </Button>
  );
};

export default PayMent;
