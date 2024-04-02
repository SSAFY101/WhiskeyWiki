import style from "./CocktailRecipe.module.css";
import { useState } from "react";
import axios from "axios";
import CocktailSample from "../../../assets/images/cocktail/CocktailSample.png";
import HeartGray from "../../../assets/icon/HeartGray.svg";
import HeartFilled from "../../../assets/icon/HeartFilled.svg";
function CocktailRecipe({ whiskeyId }) {
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(true);
  const cocktail = {
    name: "앱솔루트 오렌지 하이볼",
    alcoholContent: "앱솔루트",
    otherContent: "탄산읍료, 얼음, 오렌지 슬라이스",
    recipe:
      "1. 컵에 얼음과 앱솔루트를 넣는다. 2. 탄산 음료를 넣고 섞는다. 3. 오렌지 슬라이스로 장식한다",
  };
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cocktail/recommend/${whiskeyId}`
      );
      console.log(response.data);
    } catch (error) {
      console.log("칵테일 목록을 가져오기 오류", error);
    }
  };
  fetchRecipe();
  return (
    <div className={style.outerContainer}>
      <div className={style.bubble}>
        <img
          className={style.heartIcon}
          src={isFavorite ? HeartFilled : HeartGray}
        ></img>
        <h1>{cocktail.name}</h1>
        <div className={style.infoArea}>
          <div className={style.textArea}>
            <p className={style.titleWithLines}>재료</p>
            <p>{cocktail.alcoholContent}</p>
            <p>{cocktail.otherContent}</p>
            <p className={style.titleWithLines}>만드는법</p>
            {cocktail.recipe}
          </div>
          <div className={style.imageArea}>
            <img src={CocktailSample} />
          </div>
        </div>
      </div>
      <button className={style.recommendAgain}>다시 추천하기</button>
    </div>
  );
}

export default CocktailRecipe;
