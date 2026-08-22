import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
  const { registerUser } = useAccount(); // 使用useAccount hook获取登录方法
  // 使用useForm hook创建表单
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  // 提交表单
  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data); // 调用登录方法
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          color: "secondary.main",
        }}
      >
        <LockOpen fontSize="large"></LockOpen>
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        control={control}
        name="password"
        type="password"
      ></TextInput>
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Don't have an account?
        <Typography sx={{ ml: 2 }} component={Link} to="/register">
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
}
