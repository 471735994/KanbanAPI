import { format, type DateArg } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>) {
  return format(date, "MMM d, yyyy hh:mm a");
}

export const requiredString = (fieldName: string) =>
  z.string().min(3, { message: `${fieldName} is required` });
