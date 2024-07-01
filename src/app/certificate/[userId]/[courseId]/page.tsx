import React from 'react';

const Certificate = () => {
  return (
    <div className='bg-gray-300 p-3'>
      <div className='relative w-2/3 h-3/4 bg-primary-600 p-8 mx-auto text-gray-800 font-sans shadow-lg'>
        <div className='absolute inset-0 border-2 border-white w-[794px] h-[594px] m-auto'></div>
        <div className='absolute inset-0 border-2 border-white w-[730px] h-[530px] m-auto'></div>
        <div className='relative w-[720px] h-[520px] p-0 border border-gray-200 bg-white mx-auto'>
          <div className='w-[650px] h-[200px] relative top-[70px] mx-auto'>
            <div className='text-center mt-10'>
              <h2 className='cursive text-4xl'>
                Eduwise Certificate of Completion
              </h2>
            </div>
            <div className='text-center mt-8'>
              <div className='w-2/3 mx-auto underline'>
                <span className='font-bold text-lg'>
                  TrueNorth Administrator
                </span>
              </div>
            </div>
            <div className='text-center mt-6'>
              <span className='cursive block text-lg'>has earned</span>
              <span className='font-bold block text-base'>
                PD175: 1.0 Credit Hours
              </span>
            </div>
            <div className='text-center mt-6'>
              <span className='cursive block text-lg'>
                while completing the training course entitled
              </span>
            </div>
          </div>
          <div className='w-[650px] h-[100px] mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div className='flex justify-end'>
              <div className='flex flex-col items-end'>
                <span className='block text-base'>Date Completed</span>
                <span className='pm-empty-space block underline'></span>
                <span className='font-bold block'>DOB:</span>
                <span className='font-bold block'>
                  Social Security # (last 4 digits)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
