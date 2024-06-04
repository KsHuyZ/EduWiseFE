'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ImageType } from '@/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface IModalPreviewProps {
  img: ImageType;
  name: string;
}

const ModalPreview = ({ img, name }: IModalPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative'>
          <div className='absolute bg-gradient-to-t w-full h-full from-[#2d2f31e6] cursor-pointer rounded-md'>
            <div className='flex h-full items-center justify-center'>
              <IoPlayCircleOutline className='w-10 h-10 text-white' />
            </div>
          </div>
          <Image
            src={img.url}
            width={500}
            height={200}
            className='rounded-md'
            alt='Course preview'
          />
        </div>
      </DialogTrigger>
      <DialogContent className='min-w-fit duration-200'>
        <DialogHeader>
          <DialogDescription>Course Preview</DialogDescription>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <ReactPlayer
          url='/videos/course-example.mp4'
          playing={true}
          light
          pip
          autoPlay
          muted={false}
          controls
          style={{
            borderRadius: 20,
          }}
        >
          <source autoFocus src='/videos/course-example.mp4' type='video/mp4' />
        </ReactPlayer>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
