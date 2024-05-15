import { CourseType } from '@/types';

export const __mockCourses: CourseType[] = [
  {
    id: '001',
    name: 'Introduction to Web Development',
    description:
      'Learn the basics of web development including HTML, CSS, and JavaScript.',
    file: 'https://example.com/webdev.jpg',
    price: 49.99,
    categories: [
      { id: '001', name: 'Programming' },
      { id: '002', name: 'Web Development' },
    ],
    tags: [
      { id: '101', name: 'Beginner' },
      { id: '102', name: 'Frontend' },
    ],
  },
  {
    id: '002',
    name: 'Data Science Fundamentals',
    description:
      'Explore the fundamentals of data science, including statistics, machine learning, and data visualization.',
    file: 'https://example.com/datascience.jpg',
    price: 59.99,
    categories: [
      { id: '001', name: 'Programming' },
      { id: '003', name: 'Data Science' },
    ],
    tags: [
      { id: '103', name: 'Intermediate' },
      { id: '104', name: 'Statistics' },
    ],
  },
  {
    id: '003',
    name: 'Introduction to Graphic Design',
    description:
      'Discover the principles of graphic design, including typography, color theory, and layout.',
    file: 'https://example.com/graphicdesign.jpg',
    price: 39.99,
    categories: [
      { id: '004', name: 'Design' },
      { id: '005', name: 'Art' },
    ],
    tags: [
      { id: '105', name: 'Creative' },
      { id: '106', name: 'Typography' },
    ],
  },
  {
    id: '004',
    name: 'Python Programming',
    description:
      'Master Python programming language from basics to advanced concepts.',
    file: 'https://example.com/python.jpg',
    price: 69.99,
    categories: [{ id: '001', name: 'Programming' }],
    tags: [
      { id: '107', name: 'Advanced' },
      { id: '108', name: 'Backend' },
    ],
  },
  {
    id: '005',
    name: 'Photography Basics',
    description:
      'Learn the basics of photography, including camera settings, composition, and lighting.',
    file: 'https://example.com/photography.jpg',
    price: 29.99,
    categories: [
      { id: '005', name: 'Art' },
      { id: '009', name: 'Photography' },
    ],
    tags: [
      { id: '109', name: 'Photography' },
      { id: '110', name: 'Composition' },
    ],
  },
  {
    id: '006',
    name: 'Introduction to Machine Learning',
    description: 'Get started with machine learning concepts and algorithms.',
    file: 'https://example.com/machinelearning.jpg',
    price: 79.99,
    categories: [
      { id: '001', name: 'Programming' },
      { id: '003', name: 'Data Science' },
    ],
    tags: [
      { id: '111', name: 'Machine Learning' },
      { id: '112', name: 'Algorithms' },
    ],
  },
  {
    id: '007',
    name: 'Digital Marketing Essentials',
    description:
      'Learn the essentials of digital marketing, including SEO, social media, and email marketing.',
    file: 'https://example.com/digitalmarketing.jpg',
    price: 49.99,
    categories: [{ id: '008', name: 'Marketing' }],
    tags: [
      { id: '113', name: 'SEO' },
      { id: '114', name: 'Social Media' },
    ],
  },
  {
    id: '008',
    name: 'English Language Mastery',
    description:
      'Master English language skills including grammar, vocabulary, and pronunciation.',
    file: 'https://example.com/english.jpg',
    price: 34.99,
    categories: [{ id: '010', name: 'Language' }],
    tags: [
      { id: '115', name: 'Grammar' },
      { id: '116', name: 'Vocabulary' },
    ],
  },
];
