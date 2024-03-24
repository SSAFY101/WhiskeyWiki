import { useRef, useEffect, useState } from "react";
import style from "./css/Home.module.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const Home = () => {
  const containerRef = useRef();
  const sectionRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const mainPage = document.getElementById("mainPage");
    mainPage.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );

    return () => {
      mainPage.removeEventListener("wheel", function (e) {
        e.preventDefault();
      });
    };
  }, []);

  const scrollToSection = (index) => {
    const section = sectionRefs[index].current;
    containerRef.current.scrollTo({
      top: section.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const wheelHandler = (e) => {
    const { deltaY } = e;
    const scrollTop = containerRef.current.scrollTop;
    const pageHeight = window.innerHeight;

    if (deltaY > 0) {
      if (scrollTop >= 0 && scrollTop < pageHeight) {
        scrollToSection(1); // 1 - 2
      } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        scrollToSection(2); // 2 - 3
      } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
        scrollToSection(3); // 3 - 4
      }
    } else if (deltaY < 0) {
      if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        scrollToSection(0); // 2 - 1
      } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
        scrollToSection(1); // 3 - 2
      } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
        scrollToSection(2); // 4 - 3
      }
    }
  };

  return (
    <div
      id="mainPage"
      ref={containerRef}
      className={`${style.container}`}
      onWheel={wheelHandler}
    >
      <div ref={sectionRefs[0]}>
        <Section1 />
      </div>
      <div ref={sectionRefs[1]}>
        <Section2 />
      </div>
      <div ref={sectionRefs[2]}>
        <Section3 />
      </div>
      <div ref={sectionRefs[3]}>
        <Section4 />
      </div>
    </div>
  );
};

export default Home;
