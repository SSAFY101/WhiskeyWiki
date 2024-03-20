import Navbar from "../../widgets/Navbar";
import style from "./css/Home.module.css";

import HomeImg1 from "./images/Home1.jpg";

const Section1 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg1})` }}
    >
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={`${style.title}`}>Welcome to Whiskey Wiki</div>
      <div className={`${style.layer}`} />
    </div>
  );
};

export default Section1;
