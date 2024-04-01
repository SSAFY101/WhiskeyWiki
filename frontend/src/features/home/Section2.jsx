import { Link } from "react-router-dom";
import style from "./css/Home.module.css";

import HomeImg2 from "./images/Home2.jpg";

const Section2 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg2})` }}
    >
      <div className={`${style.leftTitle}`}>AI Service</div>
      <span className={`${style.leftSubTitle}`}>
        가지고 있는 위스키 이름이 궁금한가요?
      </span>
      <Link to="/register" className={`${style.leftLink}`}>
        {" >"} 이미지 업로드해서 찾기
      </Link>
      <div className={`${style.leftLayer}`} />
    </div>
  );
};

export default Section2;
