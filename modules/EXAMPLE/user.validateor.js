import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

// use JOI instead of zod
