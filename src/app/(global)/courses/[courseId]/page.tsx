import { formatDistance } from 'date-fns';
import { Award, Clock, GraduationCap, Signal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import Input from '@/components/inputs/Input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';

import { __mockReviews } from '@/__mocks__';
import CourseList from '@/app/(global)/courses/[courseId]/_components/course-list';
// import { getCourseById } from '@/api';
import ModalPreview from '@/app/(global)/courses/[courseId]/_components/modal-preview';
import { generateNameColor } from '@/utils';

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params: { courseId } }: CourseIdProps) => {
  // const course = getCourseById(courseId);

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col space-y-8'>
        <div className='bg-primary-600 px-10 py-5 rounded-md'>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <div className='col-span-2'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-white'>
                  The Complete 2024 Web Development Bootcamp
                </h3>
                <div className='flex items-center space-x-4'>
                  <Ratings rating={4.5} totalStars={5} variant='yellow' />
                  <span className='underline text-white'>(400 ratings)</span>
                  <span className='text-white'>3000 students</span>
                </div>
                <div>
                  <p className='text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit corrupti delectus dignissimos, nihil repudiandae
                    excepturi soluta totam quas impedit in architecto dicta
                    explicabo ullam hic quam unde expedita quis illum!
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <Badge className='text-white' variant='outline'>
                    Figma
                  </Badge>
                  <Badge className='text-white' variant='outline'>
                    UI/UX Design
                  </Badge>
                  <Badge className='text-white' variant='outline'>
                    Web Design
                  </Badge>
                </div>
              </div>
            </div>
            <ModalPreview />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2 items-start'>
          <div className='flex flex-col space-y-8 col-span-2'>
            <div className='flex flex-col space-y-4'>
              <h3>Course content</h3>
              <CourseList id={courseId} />
            </div>
            <div className='flex flex-col space-y-4'>
              <h3>Description</h3>
              <span>
                Become a Python Programmer and learn one of employer's most
                requested skills of 2023! This is the most comprehensive, yet
                straight-forward, course for the Python programming language on
                Udemy! Whether you have never programmed before, already know
                basic syntax, or want to learn about the advanced features of
                Python, this course is for you! In this course we will teach you
                Python 3. With over 100 lectures and more than 21 hours of video
                this comprehensive course leaves no stone unturned! This course
                includes quizzes, tests, coding exercises and homework
                assignments as well as 3 major projects to create a Python
                project portfolio! Learn how to use Python for real-world tasks,
                such as working with PDF Files, sending emails, reading Excel
                files, Scraping websites for informations, working with image
                files, and much more! This course will teach you Python in a
                practical manner, with every lecture comes a full coding
                screencast and a corresponding code notebook! Learn in whatever
                manner is best for you! We will start by helping you get Python
                installed on your computer, regardless of your operating system,
                whether its Linux, MacOS, or Windows, we've got you covered. We
                cover a wide variety of topics, including: Command Line Basics
                Installing Python Running Python Code Strings Lists Dictionaries
                Tuples Sets Number Data Types Print Formatting Functions Scope
                args/kwargs Built-in Functions Debugging and Error Handling
                Modules External Modules Object Oriented Programming Inheritance
                Polymorphism File I/O Advanced Methods Unit Tests and much more!
                You will get lifetime access to over 100 lectures plus
                corresponding Notebooks for the lectures! This course comes with
                a 30 day money back guarantee! If you are not satisfied in any
                way, you'll get your money back. Plus you will keep access to
                the Notebooks as a thank you for trying out the course! So what
                are you waiting for? Learn Python in a way that will advance
                your career and increase your knowledge, all in a fun and
                practical way!
              </span>
            </div>
            <div className='flex flex-col space-y-4'>
              <h3>Reviews</h3>
              <Carousel
                opts={{
                  align: 'start',
                }}
                className='w-full items-stretch'
              >
                <CarouselContent>
                  {__mockReviews.map((review, index) => (
                    <CarouselItem key={index} className='basis-1 md:basis-1/2'>
                      <div className='p-1 h-full'>
                        <Card className='h-full'>
                          <CardContent className='py-2'>
                            <div className='flex flex-col space-y-4'>
                              <div className='flex items-center space-x-2'>
                                <div
                                  className='flex h-10 w-10 items-center justify-center rounded-full text-white'
                                  style={{
                                    backgroundColor: generateNameColor(
                                      cn(review.firstName, review.lastName)
                                    ),
                                  }}
                                >
                                  {cn(review.firstName.charAt(0))}
                                </div>
                                <div className='flex flex-col space-y-2'>
                                  <Label>
                                    {review.firstName} {review.lastName}
                                  </Label>
                                  <span className='font-bold text-sm'>
                                    {formatDistance(
                                      new Date(review.date),
                                      new Date(),
                                      { addSuffix: true }
                                    )}
                                  </span>
                                  <Ratings
                                    rating={review.rate}
                                    totalStars={5}
                                    variant='yellow'
                                  />
                                </div>
                              </div>
                              <div className='line-clamp-5'>
                                {review.content}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Card className='sticky top-0'>
            <CardHeader>
              <CardTitle>20$</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-12'>
                <div className='flex flex-col space-y-8'>
                  <div className='flex flex-col space-y-4'>
                    <Button>Add to cart</Button>
                    <Button variant='outline'>Buy now</Button>
                  </div>
                  <div className='flex flex-col space-y-4'>
                    <Label>This course includes:</Label>
                    <div className='flex flex-col space-y-2 text-gray-500'>
                      <div className='flex items-center space-x-2'>
                        <Signal className='w-4 h-4' />
                        <span>Intermediate</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <GraduationCap className='w-4 h-4' />
                        <span>10 Total Enrolled</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Clock className='w-4 h-4' />
                        <span>12 hours Duration</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Award className='w-4 h-4' />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label>Coupon code</Label>
                    <div className='grid grid-cols-3 gap-2 items-center'>
                      <div className='flex flex-col col-span-2 space-y-2'>
                        <Input placeholder='Enter your coupon code' />
                      </div>
                      <Button>Apply</Button>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col space-y-4'>
                  <Separator />
                  <div className='flex flex-col space-y-4'>
                    <Label>Author</Label>
                    <Link
                      href='/user/123'
                      className='flex space-x-4 cursor-pointer'
                    >
                      <div
                        className='flex h-8 w-8 items-center justify-center rounded-full text-white'
                        style={{
                          background: generateNameColor('Huy Phan Tien'),
                        }}
                      >
                        H
                      </div>
                      <span>Huy Phân Tiến</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
