import style from "./css/MyPageModal.module.css";
import { useNavigate } from "react-router-dom";
import AlertIcon from "../../assets/icon/AlertIcon.svg";
import instance from "../auth/axiosInterceptor";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/slices/user";
import { UseSelector } from "react-redux";
function MyPageModal({ onClose }) {
  
  const dispatch = useDispatch();

  // 닉네임 가져오기
  const nickName = useSelector((state) => state.user.nickName);
  console.log(nickName);
  const logoutTest = (e) => {
    e.preventDefault();

    if (window.confirm("로그아웃 하시겠습니까?")) {
      instance
        .post(`/api/auth/logout`)
        .then((res) => {
          console.log("로그아웃", res);

          // 닉네임 삭제
          dispatch(userAction.setNickname(null));

          // axiois 설정 제거
          instance.defaults.headers.common["Authorization"] = null;
          //마이페이지 모달 닫기
          onClose();
        })
        .catch((err) => {
          console.log("로그아웃 실패", err);
        });
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    onClose();
    navigate("/mypage");
  };
  return (
    <div className={style.outerContainer}>
      <p>
        <span className={style.highlight}>{nickName}</span> 님, 환영합니다.
      </p>
      <div className={style.innerUpperContainer}>
        <div className={style.chatIconWrapper}>
          <img src={AlertIcon}></img>
          <p>채팅</p>
        </div>
        <p className={style.lertCount}>!!</p>
      </div>
      <div className={style.innerLowerContainer}>
        <div
          onClick={handleNavigate}
          style={{ cursor: "pointer" }}
          className={style.goTo}
        >
          마이페이지
        </div>
        <div
          className={style.goTo}
          style={{ cursor: "pointer" }}
          onClick={logoutTest}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}
export default MyPageModal;
