import { Link } from "react-router-dom";

import style from "./Navbar.module.css";

function Navbar({ onLoginClick, onSignupClick }) {
  console.log(typeof onLoginClick);

  return (
    <div className={`${style.container}`}>
      {/* 로고 */}
      <Link to="/">
        <div className={`${style.logo}`}>Logo</div>
      </Link>
      {/* 메뉴 */}
      <div className={`${style.menu}`}>
        <div>Information</div>
        <Link to="/register">AI</Link>
        <Link to="/exchangeList">Explore</Link>
        <div>My Bar</div>
      </div>
      {/* 유저 관리 */}
      <div className={`${style.user}`}>
        <div onClick={onLoginClick} style={{ cursor: "pointer" }}>
          Login
        </div>
        <div onClick={onSignupClick} style={{ cursor: "pointer" }}>
          Sign Up
        </div>
      </div>
      {/* <ul className={`${style.menu}`}>
        <li onClick={onLoginClick} style={{ cursor: "pointer" }}>
          로그인
        </li>
        <li onClick={onSignupClick} style={{ cursor: "pointer" }}>
          회원가입
        </li>
        <li>
          <Link to="/exchangeList">거래 목록</Link>
        </li>
      </ul> */}
    </div>
  );
}

export default Navbar;
