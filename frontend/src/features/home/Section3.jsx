import { Link } from "react-router-dom";
import style from "./css/Home.module.css";

import HomeImg3 from "./images/Home3.jpg";

const Section3 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg3})` }}
    >
      <div className={`${style.rightTitle}`}>My Bar</div>
      <span className={`${style.rightSubTitle}`}>
        내 위스키를 등록하고 관리하세요
      </span>
      <Link to="/myBar" className={`${style.rightLink}`}>
        {" >"} 나만의 바로 이동하기
      </Link>
      <div className={`${style.rightLayer}`} />
    </div>
  );
};

export default Section3;
