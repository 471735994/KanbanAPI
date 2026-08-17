import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 为每个请求添加延迟
agent.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[][] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat(); // 抛出错误，让调用方捕获
        } else {
          toast.error("bad request"); // 400 错误提示
        }
        break;

      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", {
          state: { error: data },
        });
        break;
    }
    return Promise.reject(error);
  },
);

export default agent;
