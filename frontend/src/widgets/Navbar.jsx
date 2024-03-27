import { Link } from "react-router-dom";
import axios from "axios";

import style from "./Navbar.module.css";

import myPageIcon from "../assets/images/nav/myPage.png";
import myPageHoverIcon from "../assets/images/nav/myPage_hover.png";

function Navbar() {
  const nickName = localStorage.getItem("nickName");

  const logoutTest = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하시겠습니까?")) {
      console.log(axios.defaults.headers.common["Access-Token"]); // test

      // localStorage.removeItem("nickName");
      // window.location.reload();

      axios
        .post("http://localhost:5050/api/auth/login")
        .then((res) => {
          console.log("로그아웃", res); // test
          localStorage.removeItem("nickName");

          axios.defaults.headers.common["Access-Token"] = null;

          console.log(axios.defaults.headers.common["Access-Token"]); // test

          // window.location.reload();
        })
        .catch((err) => {
          console.log("로그아웃 실패", err);
        });
    }
  };

  return (
    <div className={`${style.container}`}>
      {/* 로고 */}
      <div className={`${style.logo}`}>
        <Link to="/">WW</Link>
      </div>
      {/* 메뉴 */}
      <div className={`${style.menu}`}>
        <Link to="/whiskeyInfo">Information</Link>
        <Link to="/register">AI</Link>
        <Link to="/exchange">Exchange</Link>
        <Link to="/myBar">My Bar</Link>
      </div>
      {/* 유저 */}
      <div className={`${style.user}`}>
        {!nickName && <Link to="/login">Login</Link>}
        {nickName && (
          <Link to="/myPage">
            <img src={myPageIcon} onClick={logoutTest} />
          </Link>
        )}

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
    </div>
  );
}

export default Navbar;
