import { Link } from "react-router-dom";
import style from "./css/MyPage.module.css";
function MyPage() {
  return (
    <div className={style.outerContainer}>
      <p>헤에 님, 안녕하세요</p>
      <div className={style.innerContainer}>
        <Link to="/chat" className={style.link}>
          <div className={style.box}>채팅 목록</div>
        </Link>
        <Link>
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
