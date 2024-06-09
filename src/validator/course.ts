import { z } from 'zod';

const MAX_FILE_SIZE = 2000000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
];

const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(0, 'Tag name is require!'),
});
const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(0, 'Category name is require!'),
});

export const courseInfoSchema = z.object({
  name: z.string({ required_error: 'Course name is require!' }).trim(),
  price: z.number().default(0),
  description: z.string().min(0, 'About course is require').trim(),
  file: z.any(),
  tags: z.array(tagSchema).min(0, 'Tag at lease one item!'),
  categories: z.array(categorySchema).min(0, 'Category at lease one item!'),
  level: z.string().min(0, 'Level is require!'),
  discount: z.number({
    required_error: 'Discount is require!',
  }),
});

export const createVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  file: z.any().refine((file) => {
    return ACCEPTED_VIDEO_TYPES.includes(file?.type);
  }, 'Only .mp4, .webm formats are supported.'),
  preview: z.boolean().default(false),
});
