import style from "./InfoCard.module.css";
import whiskeyImages from "./components/Whiskeys";
import { useNavigate } from "react-router-dom";
function Infocard({ whiskeyId, nameKr, nameEn, taste, abv, price, rating, onClick }) {
  const ratingStars = "★".repeat(rating) + "☆".repeat(5 - rating);
  // nameEn을 사용해 해당하는 이미지 찾기
  const image = whiskeyImages[nameEn];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/whiskeyDetail/${whiskeyId}`, {state:{imageUrl:image}})

  }
  return (
    <div className={style.container} onClick={handleClick}>
      <div className={style.outerCard} onClick={onClick}>
        <img className={style.whiskeyImg} src={image} alt="" />
        <div className={style.infoArea}>
          <h3>{nameEn}</h3>
          <p className={style.nameKr}>{nameKr}</p>
          <h4>{abv}도</h4>
          <h4>{taste}</h4>
          <h4>{price}원</h4>
          <div className={style.rating}>{ratingStars}</div>
        </div>
      </div>
    </div>
  );
}

export default Infocard;
