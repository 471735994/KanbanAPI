import { z } from "zod";

const requiredString = (fieldName: string) =>
  z.string().min(3, { message: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.coerce
    .date({ message: "Date is required" })
    .refine((date) => date > new Date(), {
      message: "Date must be in the future",
    }),
  location: z.object({
    venue: requiredString("Venue"),
    city: requiredString("City"),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
