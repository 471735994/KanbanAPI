import axios from "axios";
import { toast } from "react-toastify";

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
    const { status } = error.response;
    switch (status) {
      case 400:
        toast.error("bad request");
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        toast.error("not found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  },
);

export default agent;
