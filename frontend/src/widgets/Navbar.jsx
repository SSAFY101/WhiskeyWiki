import { Link }from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <p>네브바 테스트</p>
      <ul>
        <li><Link to="/login">로그인</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;