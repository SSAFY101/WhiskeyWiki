import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../store/slices/user";

import axios from "axios";
import instance from "../features/auth/axiosInterceptor";

import style from "./Navbar.module.css";
import UserIcon from "../assets/icon/UserIcon.svg";
import myPageIcon from "../assets/images/nav/myPage.png";
import myPageHoverIcon from "../assets/images/nav/myPage_hover.png";
import { useEffect } from "react";

function Navbar({ onUserIconClick }) {
  const dispatch = useDispatch();
  const nickName = useSelector((state) => state.user.nickName);

  // useEffect(() => {
  //   const accessToken = instance.defaults.headers.common["Authorization"];

  //   if (!accessToken) {
  //     axios
  //       .post("http://localhost:5000/api/auth/refresh")
  //       .then((res) => {
  //         const accessToken = res.headers["authorization"];

  //         instance.defaults.headers.common["Authorization"] = `${accessToken}`;
  //         instance.defaults.headers.post["Content-Type"] = "application/json";
  //       })
  //       .catch((err) => {
  //         console.log("토큰 재발급 실패", err);
  //         if (err.response.status == 401) {
  //           dispatch(userAction.setNickname(null));
  //         }
  //       });
  //   }
  // }, []);

  const logoutTest = (e) => {
    e.preventDefault();

    if (window.confirm("로그아웃 하시겠습니까?")) {
      instance
        .post(process.env.REACT_APP_API_URL + "/auth/logout")
        .then((res) => {
          console.log("로그아웃", res);

          // 닉네임 삭제
          dispatch(userAction.setNickname(null));

          // axiois 설정 제거
          instance.defaults.headers.common["Authorization"] = null;
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
        
      <img
        src={UserIcon}
        onClick={onUserIconClick}
        className={`${style.myPage}`}
      />

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
