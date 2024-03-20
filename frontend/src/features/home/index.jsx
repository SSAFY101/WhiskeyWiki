import { useRef } from "react";

import style from "./css/Home.module.css";

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const Home = () => {
  const sectionRef = useRef(null);

  const wheelHandler = (e) => {
    e.preventDefault();

    const container = sectionRef.current;
    const delta = e.deltaY;

    console.log(delta); // 테스트

    container.scrollTo({
      top: container.scrollTop + delta,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${style.container}`}
      onWheel={wheelHandler}
      ref={sectionRef}
    >
      <div className={style.section}>
        <Section1 />
      </div>
      <div className={style.section}>
        <Section2 />
      </div>
      <div className={style.section}>
        <Section3 />
      </div>
      <div className={style.section}>
        <Section4 />
      </div>
    </div>
  );
};

export default Home;
