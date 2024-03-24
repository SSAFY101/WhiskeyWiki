import { useState } from "react";
import IdInput from "./backUp/IdInput";
import PasswordInput from "./backUp/PasswordInput";
import LoginButton from "./components/LoginButton";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도", userId, userPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <LoginButton />
      </button>
    </form>
  );
}

export default Login;
