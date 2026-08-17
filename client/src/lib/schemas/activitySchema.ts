import { z } from "zod";

const requiredString = (fieldName: string) =>
  z.string().min(3, { message: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  location: requiredString("Location").min(3),
  date: z.string().min(1, { message: "Date is required" }),
  city: requiredString("City"),
  venue: requiredString("Venue"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
