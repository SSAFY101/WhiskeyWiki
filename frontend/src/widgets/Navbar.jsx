import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import UserIcon from "../assets/icon/UserIcon.svg";

function Navbar({ onUserIconClick }) {
  return (
    <div className={`${style.container}`}>
      {/* 로고 */}
      <Link to="/">
        <div className={`${style.logo}`}>Logo</div>
      </Link>
      {/* 메뉴 */}
      <div className={`${style.menu}`}>
        <Link to="/whiskeyInfo">Information</Link>
        <Link to="/register">AI</Link>
        <Link to="/exchange">Exchange</Link>
        <Link to="/myBar">My Bar</Link>
      </div>
      {/* 유저 */}
      <div className={`${style.user}`}>
        <Link to="/login">Login</Link>
        {/* <div onClick={onLoginClick} style={{ cursor: "pointer" }}>
          Login
        </div>
        <div onClick={onSignupClick} style={{ cursor: "pointer" }}>
          Sign Up
        </div> */}
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

      <img
        src={UserIcon}
        onClick={onUserIconClick}
        className={`${style.myPage}`}
      />
    </div>
  );
}

export default Navbar;
