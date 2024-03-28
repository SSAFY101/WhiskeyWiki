import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("------- interceptors response error -------"); // test
    if (error.response.status == 400) {
      getNewToken();

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);

const getNewToken = () => {
  console.log("getNewToken");
  // 재발급 요청
  axios
    .post("http://localhost:5000/api/auth/refresh")
    .then((res) => {
      console.log("토큰 재발급", res);
      // const accessToken = res.headers["authorization"];

      // instance.defaults.headers.common["Authorization"] = `${accessToken}`;
      // instance.defaults.headers.post["Content-Type"] = "application/json";
    })
    .catch((err) => {
      console.log("토큰 재발급 실패", err);
      if (err.response.status == 401) {
        alert("다시 로그인해주세요.");
        autoLogout();
      }
    });
};

const autoLogout = () => {
  // 리프래시 토큰 만료 로그아웃
  axios.defaults.headers.common["Authorization"] = null;
  window.location.reload();
};

export default instance;
