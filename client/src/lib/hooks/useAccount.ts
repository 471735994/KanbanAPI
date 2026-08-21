import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";

export const useAccount = () => {
  // useQueryClient 用于获取全局的 QueryClient 实例，以便在登录成功后刷新用户数据。
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // useMutation 用于执行登录这类会修改服务器状态的请求。,creds 是登录表单数据，类型为 LoginSchema。,agent.post(...) 向后端发送 POST 请求。,useCookies=true 表示登录成功后使用 Cookie 保存身份认证信息。
  // loginUser 会包含请求状态，例如：
  // loginUser.mutate(creds)：执行登录
  // loginUser.isPending：是否正在登录
  // loginUser.isSuccess：是否成功
  // loginUser.isError：是否失败
  // loginUser.error：错误信息
  // 登录成功后，后端会返回 Set-Cookie 头，浏览器会自动保存 Cookie。
  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      await navigate("/activities");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      await navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await agent.get<User>("/account/user-info");
      return data;
    },
    enabled: !queryClient.getQueryData(["currentUser"]), // 如果已经有缓存数据，就不需要再请求了
  });
  return { loginUser, currentUser, logoutUser, loadingUserInfo };
};
