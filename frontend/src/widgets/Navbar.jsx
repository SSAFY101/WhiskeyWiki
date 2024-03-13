import { Link } from "react-router-dom";

function Navbar({ onLoginClick }) {
  console.log(typeof onLoginClick)
  return (
    <nav>
      <p>네브바 테스트</p>

      <ul>
        <li onClick={onLoginClick} style={{cursor:'pointer'}}>로그인</li>
        <li>
          <Link to="/myInfo">내 정보</Link>
        </li>
        <li>
          <Link to="/exchangeList">거래 목록</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
