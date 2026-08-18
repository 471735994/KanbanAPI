import { TextField, type TextFieldProps } from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
    <TextField
      {...field}
      {...props}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      variant="outlined"
      fullWidth
      onChange={(e) => field.onChange(e.target.value)}
      value={field.value ?? ""}
    ></TextField>
  );
}
