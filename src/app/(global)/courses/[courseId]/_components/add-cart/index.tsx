'use client';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useAddCart } from '@/app/(global)/courses/[courseId]/_components/add-cart/hooks';

const AddCart = ({ id }: { id: string }) => {
  const { mutateAsync, isPending } = useAddCart();
  return (
    <Button isLoading={isPending} onClick={() => mutateAsync(id)}>
      Add to cart
    </Button>
  );
};

export default AddCart;
