import { z } from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
  email: z.string().email(),
  password: requiredString("Password must be at least 8 characters"),
  displayName: requiredString("Display name is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
