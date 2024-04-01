import { Link } from "react-router-dom";
import style from "./css/Home.module.css";

import HomeImg4 from "./images/Home4.jpg";

const Section4 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg4})` }}
    >
      <div className={`${style.leftTitle}`}>Exchange with your Neighbors</div>
      <span className={`${style.leftSubTitle}`}>
        더 더양한 위스키를 원하시나요?
      </span>
      <Link to="/exchange" className={`${style.leftLink}`}>
        {" >"} 이웃들과 위스키 교환하기
      </Link>
      <div className={`${style.leftLayer}`} />
    </div>
  );
};

export default Section4;
