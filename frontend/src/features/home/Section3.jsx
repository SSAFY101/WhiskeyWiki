import style from "./css/Home.module.css";

import HomeImg3 from "./images/Home3.jpg";

const Section3 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg3})` }}
    >
      <span className={`${style.layer}`} />
      <div className={`${style.title}`}>My Bar</div>
    </div>
  );
};

export default Section3;
