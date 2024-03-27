import axios from "axios";

// axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      getNewToken();

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);

const getNewToken = () => {
  // 재발급 요청
  axios
    .post("요청주소")
    .then((response) => {
      const accessToken = response.headers.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    })
    .catch((error) => {
      if (error.response.status == 401) {
        alert("다시 로그인해주세요.");
        autoLogout();
      }
    });
};

const autoLogout = () => {
  // 리프래시 토큰 만료 로그아웃
  axios.defaults.headers.common["Authorization"] = ``;
  localStorage.setItem("nickName", null);
};

export default instance;
