import React from 'react';

import Spinner from '@/components/loading/spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface LoadingProps {
  open: boolean;
}

const Loading = ({ open }: LoadingProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saving certificate</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-y-8 items-center'>
          <Spinner />
          <Label>
            Please be patient, We are saving your certificate to Sepolia network
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
