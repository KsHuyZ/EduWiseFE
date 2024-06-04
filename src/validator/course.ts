import { z } from 'zod';

const MAX_FILE_SIZE = 2000000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
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
  file: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  tags: z.array(tagSchema).min(0, 'Tag at lease one item!'),
  categories: z.array(categorySchema).min(0, 'Category at lease one item!'),
  level: z.string().min(0, 'Level is require!'),
  discount: z.number({
    required_error: 'Discount is require!',
  }),
});
