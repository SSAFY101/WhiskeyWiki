import axios from "axios";
import { userAction } from "../../store/slices/user";

const { dispatch } = store;

const instance = axios.create({
  baseURL: "",
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
    if (error.response.status == 400 || error.response.status == 401) {
      // 재발급 요청
      await axios
        .post("http://localhost:5000/api/auth/refresh", null, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("2. 토큰 재발급", res);

          // axios 재설정
          const accessToken = res.headers["authorization"];
          instance.defaults.headers.common["Authorization"] = `${accessToken}`;
          instance.defaults.headers.post["Content-Type"] = "application/json";
        })
        .catch((err) => {
          console.log("토큰 재발급 실패", err);
          if (err.response.status == 401) {
            console.log("401");
            alert("다시 로그인해주세요.");
            autoLogout();
          }
        });

      console.log("3. getNewToken-after");

      const response = await instance.request(error.config);

      return response;
    }
    return Promise.reject(error);
  }
);

const autoLogout = () => {
  // 리프래시 토큰 만료 로그아웃
  instance.defaults.headers.common["Authorization"] = null;
  dispatch(userAction.setNickname(null));
  window.location.reload();
};

export default instance;
