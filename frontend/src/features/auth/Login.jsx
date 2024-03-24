import { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./components/LoginButton";

import style from "./css/auth.module.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도", userId, userPassword);
  };

  return (
    <div className={`${style.loginContainer}`}>
      <div className={`${style.loginTitle}`}>로그인</div>
      <form onSubmit={handleSubmit} className={`${style.login}`}>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" type="password" />
        <button type="submit">
          <LoginButton />
        </button>
      </form>

      <div className={`${style.signUpContainer}`}>
        <div>아직 회원이 아니신가요?</div>
        <div className={`${style.signUpRedirect}`}>
          <Link to="/">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
