import { useDispatch } from "react-redux";
import { userAction } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userAction.setNickname(null)); // 닉네임 삭제
    navigate("/login"); // 로그인 화면으로 이동
  }, []);

  return <></>;
};

export default LogoutRedirect;
