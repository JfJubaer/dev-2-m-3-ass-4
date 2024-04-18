import { z } from 'zod';

const adminValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
    role: z.enum(['admin']), // Role is fixed to 'admin'
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
  }),
});

const adminUpdateValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .optional(),
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
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AdminValidation = {
  adminValidationSchema,
  adminUpdateValidationSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
