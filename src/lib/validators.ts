import { z } from "zod";

// auth
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

// upload
export const UploadSchema = z.object({
  filename: z.string().min(1, {
    message: "Filename is required",
  }),
  url: z.string().url(),
});
export type UploadSchemaType = z.infer<typeof UploadSchema>;
