import { z } from 'zod';

const cowUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }).optional(),
    age: z.number({
      required_error: 'age is required',
    }).optional(),
    price: z.number({
      required_error: 'price is required',
    }).optional(),
    location: z.enum([
      'Dhaka',
      'Chattogram',
      'Barishal',
      'Rajshahi',
      'Sylhet',
      'Comilla',
      'Rangpur',
      'Mymensingh',
    ]).optional(),
    breed: z.enum([
      'Brahman',
      'Nellore',
      'Sahiwal',
      'Gir',
      'Indigenous',
      'Tharparkar',
      'Kankrej',
    ]).optional(),
    weight: z.number({
      required_error: 'weight is required',
    }).optional(),
    label: z.enum(['for sale', 'sold out']).optional(),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose']).optional(),
    seller: z.string({
      required_error: 'seller is required',
    }).optional(),
  }),
});
const cowValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.number({
      required_error: 'age is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    location: z.enum([
      'Dhaka',
      'Chattogram',
      'Barishal',
      'Rajshahi',
      'Sylhet',
      'Comilla',
      'Rangpur',
      'Mymensingh',
    ]),
    breed: z.enum([
      'Brahman',
      'Nellore',
      'Sahiwal',
      'Gir',
      'Indigenous',
      'Tharparkar',
      'Kankrej',
    ]),
    weight: z.number({
      required_error: 'weight is required',
    }),
    label: z.enum(['for sale', 'sold out']),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose']),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
});

export const cowValidation = {
  cowValidationSchema,
  cowUpdateValidationSchema
};
