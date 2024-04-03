// 엑세스 토큰 재발급
import axios from "axios";
// import { userAction } from "../../store/slices/user";
// const { dispatch } = store;
import { persistor } from "../../store";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    withCredentials: true,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 새로고침해서 토큰이 없거나, 토큰이 만료된 경우
    console.log("interceptor 호출한 err : ", error);

    let newAccessToken = null;

    if (error.response.status == 400 || error.response.status == 401) {
      // 재발급 요청
      await axios
        .post(`/api/auth/refresh`, null, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("토큰 재발급", res);

          newAccessToken = res.headers["authorization"];

          // instance 재설정
          instance.defaults.headers.common[
            "Authorization"
          ] = `${newAccessToken}`;
          instance.defaults.headers.post["Content-Type"] = "application/json";
        })
        .catch((err) => {
          console.log("토큰 재발급 실패", err);
          if (err.response && err.response.status == 401) {
            alert("다시 로그인해주세요.");
            // 로그아웃 처리
            instance.defaults.headers.common["Authorization"] = null;
            window.location.replace("/logoutRedirect");
          }
        });

      const response = await axios.request({
        ...error.config,
        headers: {
          ...error.config.headers,
          common: {
            ...error.config.headers.common,
            Authorization: `${newAccessToken}`,
          },
          post: {
            ...error.config.headers.post,
            "Content-Type": "application/json",
          },
        },
      });

      return response;
    }
    return Promise.reject(error);
  }
);

export default instance;
