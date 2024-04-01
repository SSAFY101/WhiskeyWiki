import axios from "axios";

const LoginButton = () => {
  const login = async () => {
    await axios
      .post("로그인 요청 api", {
        body: {
          login_id: "",
          password: "",
        },
      })
      .then((res) => {
        const { accessToken } = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      })
      .catch((err) => {
        console.log("로그인 실패 ", err);
      });
  };
  return <div>로그인</div>;
};

export default LoginButton;
