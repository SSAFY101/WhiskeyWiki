import { Link } from "react-router-dom";

import style from "./css/Home.module.css";

import HomeImg1 from "./images/Home1.jpg";

const Home = () => {
  return (
    <div
      className={`${style.container}`}
      style={{ backgroundImage: `url(${HomeImg1})` }}
    >
      <span className={`${style.layer}`} />
      <div className={`${style.title}`}>Welcome to Whiskey Wiki</div>
    </div>
  );
};

export default Home;
