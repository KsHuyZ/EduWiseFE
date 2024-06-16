'use client';

import { addSeconds, format, startOfDay } from 'date-fns';
import React, { memo, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { getStorage, setStorage } from '@/utils';

interface ICountDownTimeProps {
  totalSeconds: number;
}

const realTimeLeft =
  Number(getStorage('time-left')) -
  (new Date().getTime() / 1000 - Number(getStorage('reload-time')));

const CountDownTime = ({ totalSeconds }: ICountDownTimeProps) => {
  const [timeLeft, setTimeLeft] = useState(
    getStorage('time-left') ? realTimeLeft : totalSeconds
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      setStorage('time-left', timeLeft.toString());
      setStorage('reload-time', new Date().getTime() / 1000);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const result = addSeconds(startOfDay(new Date()), timeLeft);

  return (
    <span
      className={cn(
        'text-xl font-bold p-0 mt-0',
        timeLeft < 3568 ? 'text-red-600' : ''
      )}
    >
      {format(result, 'HH:mm:ss')}
    </span>
  );
};

export default memo(CountDownTime);
