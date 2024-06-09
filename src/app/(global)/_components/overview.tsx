'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import {
  __mockChartCompleted,
  __mockChartMonth,
  __mockChartMonthOptions,
  __mockChartOptions,
  __mockChartProgress,
} from '@/__mocks__';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col space-y-4'>
        <Card>
          <CardContent className='p-4 overflow-hidden'>
            <div className='flex flex-col space-y-4 col-span-2'>
              <span>Completed</span>
              <div className='flex items-center justify-between h-20'>
                <Label className='text-4xl font-bold'>20</Label>
                <Line
                  data={__mockChartCompleted}
                  options={__mockChartOptions}
                />
              </div>
              <div className='flex space-x-2 items-center'>
                <div className='bg-primary-200 w-6 h-6 flex items-center justify-center rounded-full'>
                  <TrendingUp className='text-primary-600 w-4 h-4' />
                </div>
                <Label>+2.6%</Label>
                <span className='text-gray-500'>than last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 overflow-hidden'>
            <div className='flex flex-col space-y-4 col-span-2'>
              <span>In progress</span>
              <div className='flex items-center justify-between h-20'>
                <Label className='text-4xl font-bold'>25</Label>
                <Line data={__mockChartProgress} options={__mockChartOptions} />
              </div>
              <div className='flex space-x-2 items-center'>
                <div className='bg-red-200 w-6 h-6 flex items-center justify-center rounded-full'>
                  <TrendingDown className='text-red-600 w-4 h-4' />
                </div>
                <Label>+2.6%</Label>
                <span className='text-gray-500'>than last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col space-y-2'>
        <Label className='text-2xl font-bold'>Your statistics</Label>
        <Line data={__mockChartMonth} options={__mockChartMonthOptions} />
      </div>
    </div>
  );
};

export default Overview;
