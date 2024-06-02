import { Lesson } from '@/types';

export const __courseMock: Lesson[] = [
  {
    id: 'lesson_001',
    title: 'Introduction to Programming',
    content: 'This lesson introduces the basics of programming.',
    idCourse: 'course_101',
    ordinalNumber: 1,
    isPublish: true,
    videos: [
      {
        id: 'video_001',
        title: 'Welcome to the Course',
        description: 'mock desc',
        preview: true,
        type: 'video',
        videoUrl: '/videos/course-example',
      },
      {
        id: 'video_002',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Setting Up Your Environment',
        videoUrl: '/videos/course-example',
      },
    ],
  },
  {
    id: 'lesson_002',
    title: 'Variables and Data Types',
    content:
      'This lesson covers variables and different data types in programming.',
    idCourse: 'course_101',
    ordinalNumber: 2,
    isPublish: true,
    videos: [
      {
        id: 'video_003',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Introduction to Variables',
        videoUrl: '/videos/course-example',
      },
      {
        id: 'video_004',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Understanding Data Types',
        videoUrl: '/videos/course-example',
      },
    ],
  },
  {
    id: 'lesson_003',
    title: 'Control Structures',
    content:
      'This lesson explains control structures such as loops and conditionals.',
    idCourse: 'course_101',
    ordinalNumber: 3,
    isPublish: false,
    videos: [
      {
        id: 'video_005',
        title: 'If Statements',
        description: 'mock desc',
        preview: true,
        type: 'video',
        videoUrl: 'https://example.com/video_005',
      },
      {
        id: 'video_006',
        description: 'mock desc',
        preview: true,
        type: 'video',
        title: 'Loops',
        videoUrl: 'https://example.com/video_006',
      },
    ],
  },
];
