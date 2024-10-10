import axios from "axios";

export const axiosInstance = axios.create({
  validateStatus: (status) => status >= 200 && status <= 302,
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "timeout of 15000ms exceeded") {
      return Promise.reject({
        ...error,
        message: "Время ожидания запроса истекло.",
      });
    }

    if (error.response?.status) {
      switch (error.response?.status) {
        case 500: {
          return Promise.reject({ ...error, message: "Ошибка сервера." });
        }
        case 400: {
          return Promise.reject({ ...error, message: "Неверный запрос." });
        }
        case 401: {
          return Promise.reject({ ...error, message: "Ошибка авторизации." });
        }
        case 403: {
          return Promise.reject({ ...error, message: "Недостаточно прав." });
        }
        case 408: {
          return Promise.reject({
            ...error,
            message: "Время ожидания запроса истекло.",
          });
        }
      }
    }

    return Promise.reject(error);
  }
);
