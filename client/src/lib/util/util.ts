import { format, type DateArg } from "date-fns";

export function formatDate(date: DateArg<Date>){
    return format(date, "MMM d, yyyy hh:mm a")
}