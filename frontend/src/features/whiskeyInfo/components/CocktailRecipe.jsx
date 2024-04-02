import style from "./CocktailRecipe.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../auth/axiosInterceptor";
import CocktailSample from "../../../assets/images/cocktail/CocktailSample.png";
import HeartGray from "../../../assets/icon/HeartGray.svg";
import HeartFilled from "../../../assets/icon/HeartFilled.svg";
function CocktailRecipe({ whiskeyId }) {
  const [recipes, setRecipe] = useState(null); //전체 레시피
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const cocktail = {
    id: 1,
    name: "앱솔루트 오렌지 하이볼",
    alcoholContent: "앱솔루트",
    otherContent: "탄산읍료, 얼음, 오렌지 슬라이스",
    recipe:
      "1. 컵에 얼음과 앱솔루트를 넣는다. 2. 탄산 음료를 넣고 섞는다. 3. 오렌지 슬라이스로 장식한다",
  };
  //즐겨찾기로 등록
  // const RegisterAsFav = async () => {
  //   try {
  //     await axios.post(`/api/cocktail/favorite/register/${cocktail.id}`)
  //     console.log("즐겨찾기 추가 성공")
  //     setIsFavorite(true)
  //   }
  //   catch (error) {
  //     console.error("즐겨찾기 추가 실패",error)
  //   }
  // }
  //컴포넌트 마운트 시 칵테일 레시피를 가져오기
  useEffect(() => {
    fetchRecipe();
  }, [whiskeyId]);

  //가져온 레시피를 저장
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`/api/cocktail/recommend/${whiskeyId}`);
      console.log("응답 데이터", response.data.data);
      setRecipe(response.data.data);
      selectRandomRecipe(response.data.data);
    } catch (error) {
      console.log("칵테일 목록 가져오기 오류", error);
    }
  };
  //랜덤으로 레시피 선택하기
  const selectRandomRecipe = (recipes) => {
    if (recipes.length > 0) {
      //랜덤 index 선택
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setSelectedRecipe(recipes[randomIndex]);
    }
  };
  //다시 추천하기 기능
  const handleRecommandAgain = () => {
    selectRandomRecipe(recipes);
  };
  return (
    <div className={style.outerContainer}>
      {selectedRecipe && (
        <div className={style.bubble}>
          <img
            className={style.heartIcon}
            // onClick={RegisterAsFav}
            src={isFavorite ? HeartFilled : HeartGray}
          ></img>
          <h1>{selectedRecipe.cocktailName}</h1>
          <p className={style.detailBox}>{selectedRecipe.detail}</p>
          <div className={style.infoArea}>
            <div className={style.textArea}>
              <p className={style.titleWithLines}>재료</p>
              <p>{selectedRecipe.whiskeyList}</p>
              <p>{selectedRecipe.ingredients}</p>
              <p className={style.titleWithLines}>만드는법</p>
              {selectedRecipe.recipe}
            </div>
            <div className={style.imageArea}>
              <img src={CocktailSample} />
            </div>
          </div>
        </div>
      )}

      <button className={style.recommendAgain} onClick={handleRecommandAgain}>
        다시 추천하기
      </button>
    </div>
  );
}

export default CocktailRecipe;
