import axios from "axios";

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// 为每个请求添加延迟
agent.interceptors.response.use(async (response) => {
  try {
    // await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

export default agent;