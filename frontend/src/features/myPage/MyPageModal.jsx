import style from "./css/MyPageModal.module.css";
import { useNavigate } from "react-router-dom";
import AlertIcon from "../../assets/icon/AlertIcon.svg";

function MyPageModal({ onClose }) {
  const userData = {
    nickname: "헤에",
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    onClose();
    navigate("/mypage");
  };
  return (
    <div className={style.outerContainer}>
      <p>
        <span className={style.highlight}>{userData.nickname}</span> 님,
        환영합니다.
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
        <div className={style.goTo}>로그아웃</div>
      </div>
    </div>
  );
}
export default MyPageModal;
