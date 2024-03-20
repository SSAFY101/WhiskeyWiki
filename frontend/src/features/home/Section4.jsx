import style from "./css/Home.module.css";

import HomeImg4 from "./images/Home4.jpg";

const Section4 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg4})` }}
    >
      <div className={`${style.title}`}>Exchange</div>
    </div>
  );
};

export default Section4;
