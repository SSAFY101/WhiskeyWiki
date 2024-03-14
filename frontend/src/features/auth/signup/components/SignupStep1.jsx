import { useState } from "react";
import IdInput from "../../components/IdInput"
import PasswordInput from "../../components/PasswordInput";

const SignupStep1 = ({onNext}) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  return (
    <div>
      <IdInput id={userId} setId={setUserId} />
      <PasswordInput password={userPassword} setPassword={setUserPassword} />
      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default SignupStep1