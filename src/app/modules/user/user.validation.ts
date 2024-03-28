import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
    role: z.enum(['seller', 'buyer']),
    name: z.object({
      firstName: z.string({
        required_error: 'Firstname is required',
      }),
      lastName: z.string({
        required_error: 'LastName is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.string({
      required_error: 'budget is required',
    }),
    income: z.string({
      required_error: 'income is required',
    }),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .optional(),
    role: z.enum(['seller', 'buyer']).optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'Firstname is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'LastName is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'phoneNumber is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'address is required',
      })
      .optional(),
    budget: z
      .string({
        required_error: 'budget is required',
      })
      .optional(),
    income: z
      .string({
        required_error: 'income is required',
      })
      .optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};
