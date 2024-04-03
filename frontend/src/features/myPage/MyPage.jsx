import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./css/MyPage.module.css";

function MyPage() {
  const nickName = useSelector((state) => state.user.nickName);
  console.log(nickName);
  return (
    <div className={style.outerContainer}>
      <p><span className={style.highlight}>{nickName}</span> 님, 안녕하세요.</p>
      <div className={style.innerContainer}>
        <Link to="/chat" className={style.link}>
          <div className={style.box}>채팅 목록</div>
        </Link>
        <Link to="/userInfo" className={style.link}>
          <div className={style.box}>회원 정보 수정</div>
        </Link>
        <Link to="/myBar" className={style.link}>
          <div className={style.box}>My Bar</div>
        </Link>
      </div>
    </div>
  );
}
export default MyPage;
