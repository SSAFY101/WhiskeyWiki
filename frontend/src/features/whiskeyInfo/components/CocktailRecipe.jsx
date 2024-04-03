import style from "./CocktailRecipe.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../auth/axiosInterceptor";
import CocktailSample from "../../../assets/images/cocktail/CocktailSample.png";
import HeartGray from "../../../assets/icon/HeartGray.svg";
import HeartFilled from "../../../assets/icon/HeartFilled.svg";
import cocktailImages from '../components/Cocktail'
function CocktailRecipe({ whiskeyId }) {
  const [recipes, setRecipe] = useState(null); //전체 레시피
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cocktailImg, setCocktailImg] = useState(CocktailSample)

  // 즐겨찾기로 등록 및 해제
  // const RegisterAsFav = async () => {
  //   try {
  //     await instance.post(
  //       `/api/cocktail/favorite/register/${selectedRecipe.cocktailId}`
  //     );
  //     console.log("즐겨찾기 추가 성공");
  //     setIsFavorite(true);
  //   } catch (error) {
  //     console.error("즐겨찾기 추가 실패", error);
  //   }
  // };
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        //즐겨찾기 해제
        await instance.delete(
          `/api/cocktail/favorite/delete/${selectedRecipe.cocktailId}`
        );
        alert("즐겨찾기 해제 성공");
      } else {
        //즐겨찾기 등록
        await instance.post(
          `/api/cocktail/favorite/register/${selectedRecipe.cocktailId}`
        );
        alert("즐겨찾기 추가 성공");
      }
      //즐겨찾기 상태 초기화
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("즐겨찾기 처리 실패", error);
    }
  };
  //컴포넌트 마운트 시 칵테일 레시피를 가져오기
  useEffect(() => {
    fetchRecipe();
  }, [whiskeyId]);
  // 칵테일 이미지 불러오기
  useEffect(() => {
    if (selectedRecipe && selectedRecipe.cocktailNameEn) {
      const image = cocktailImages[selectedRecipe.cocktailNameEn]
      setCocktailImg(image|| CocktailSample)
    }
  },[selectedRecipe])

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
            onClick={toggleFavorite}
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
              <img src={cocktailImg} />
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
