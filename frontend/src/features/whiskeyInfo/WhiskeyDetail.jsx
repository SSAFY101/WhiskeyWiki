import { useState } from "react";
import style from "./WhiskeyDetail.module.css";
import img from "../../assets/images/whiskey/Ballantines_Finest.png"
import IconContainer from "./components/IconContainer";
import Statistics from "./components/Statistics";
import ReviewList from "./components/ReviewList";
import CocktailRecipe from "./components/CocktailRecipe";

function WhiskeyDetail() {
  return (
    // <div>
    //  <Statistics/>
    // </div>
    <div>
      <div className={style.outerContainer}>
        <div className={style.innerContainer}>
          <div className={style.infoArea}>
            <img src={img} alt="" />
            <div className={style.textArea}>
              {/* <p style={{ fontSize: '40px' }}>Absolut</p> */}
              <h1>Absolut</h1>
              <h2>앱솔루트</h2>
              <IconContainer />
              <p>
                앱솔루트는 정말 맛있는 술입니다. 게다가 정말 맛있는 술입니다.
              </p>
              <div className={style.statisticsContainer}></div>
            </div>
          </div>
          <Statistics />
          <p className={style.titleWithLines}>recipe</p>
          <CocktailRecipe />
          <p className={style.titleWithLines}>review</p>
          <ReviewList />
        </div>
      </div>
    </div>
  );
}
export default WhiskeyDetail;
