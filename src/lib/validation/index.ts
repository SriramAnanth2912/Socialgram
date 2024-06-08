import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2,{message: 'name is too short'}),
    username: z.string().min(2, {message: 'Username is too short'}),
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'password must contain atleast 8 characters.'}),
  })