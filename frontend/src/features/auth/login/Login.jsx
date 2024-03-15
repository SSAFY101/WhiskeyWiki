import { useState } from "react";
import IdInput from '../components/IdInput'
import PasswordInput from "../components/PasswordInput";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도", userId, userPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IdInput id={userId} setId={setUserId} />
      <PasswordInput password={userPassword} setPassword={setUserPassword} />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
