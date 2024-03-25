import style from "./CocktailRecipe.module.css";
import CocktailSample from '../../../assets/images/cocktail/CocktailSample.png'
function CocktailRecipe() {
  return (
    <div className={style.outerContainer}>
      <div className={style.bubble}>
        <h1>앱솔루트 오렌지 하이볼</h1>
        <div className={style.infoArea}>
          <div className={style.textArea}>
            <p className={style.titleWithLines}>재료</p>
            <p>앱솔루트</p>
            <p>탄산음료, 얼음, 오렌지 슬라이스</p>
            <p className={style.titleWithLines}>만드는법</p>
            <p>1. 컵에 얼음과 앱솔루트를 넣는다.</p>
            <p>2. 탄산 음료를 넣고 섞는다.</p>
            <p>3. 오렌지 슬라이스로 장식한다</p>
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
