import style from "./css/Home.module.css";

import HomeImg2 from "./images/Home2.jpg";

const Section2 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg2})` }}
    >
      <div className={`${style.title}`}>AI Service</div>
    </div>
  );
};

export default Section2;
