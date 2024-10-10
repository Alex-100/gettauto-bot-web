import { AxiosRequestConfig } from "axios";


const axiosReqConfig = (params?: any): AxiosRequestConfig => {
  const token: string | undefined = '$2a$12$xJnUF0bb8ty3QJTsoIOLbOiCIOA.sraT68rvljw.1xmI5rfMcxQNu';

  let config = {};

  if (token)
    config = {
      ...config,
      headers: {
        'X-TOKEN': token,
      },
    };

  return config;
};

export default axiosReqConfig;
