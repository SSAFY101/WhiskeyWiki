import Navbar from "../../widgets/Navbar";
import style from "./css/Home.module.css";

import HomeImg1 from "./images/Home1.jpg";

const Section1 = () => {
  return (
    <div
      className={style.section}
      style={{ backgroundImage: `url(${HomeImg1})` }}
    >
      <Navbar className={`${style.navbar}`} />
      {/* <span className={`${style.layer}`} /> */}
      <div className={`${style.title}`}>Welcome to Whiskey Wiki</div>
    </div>
  );
};

export default Section1;
