import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import instance from "./axiosInterceptor";

import LoginButton from "./components/LoginButton";

import style from "./css/auth.module.css";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // 입력
  const changeUserId = (e) => {
    setUserId(e.target.value);
  };

  const changePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 요청
    axios
      .post("http://localhost:5050/api/auth/login", {
        loginId: userId,
        password: userPassword,
      })
      .then((res) => {
        console.log("로그인", res);

        const data = res.data.data;
        const nickName = data.nickName;
        localStorage.setItem("nickName", "테스트");

        const accessToken = res.headers["access-token"];
        const refreshToken = res.headers["refresh-token"];

        console.log("accessToken", accessToken); // test
        console.log("refreshToken", refreshToken); // test

        axios.defaults.headers.post["Content-Type"] = "application/json";

        localStorage.setItem("test", refreshToken);

        axios.defaults.headers.common["Access-Token"] = `${accessToken}`;

        console.log(axios.defaults.headers.common["Access-Token"]); // test

        navigate("/");
      })

      .catch((err) => {
        console.log("로그인 실패", err);
      });
  };

  return (
    <div>
      <div className={`${style.loginContainer}`}>
        <div className={`${style.loginTitle}`}>로그인</div>
        <form onSubmit={handleSubmit} className={`${style.login}`}>
          <input
            placeholder="아이디"
            value={userId}
            onChange={changeUserId}
            spellCheck="false"
            maxLength="20"
          />
          <input
            placeholder="비밀번호"
            type="password"
            value={userPassword}
            onChange={changePassword}
            maxLength="20"
          />
          <button type="submit">
            <LoginButton />
          </button>
        </form>

        <div className={`${style.signUpContainer}`}>
          <div>아직 회원이 아니신가요?</div>
          <div className={`${style.signUpRedirect}`}>
            <Link to="/signUp">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
