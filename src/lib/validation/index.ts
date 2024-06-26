import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2,{message: 'name is too short'}),
    username: z.string().min(2, {message: 'Username is too short'}),
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(4, {message: 'password must contain atleast 8 characters.'}),
  })

  export const SignInValidation = z.object({
    email: z.string().email({message: 'Invalid email address.'}),
    password: z.string().min(4,{message: 'Password must contain atleast 8 characters'}),
  })

  export const  PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  })

  export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string(),
    email: z.string().email(),
    bio: z.string(),
  });
