import style from "./InfoCard.module.css";
import whiskeyImages from "./components/Whiskeys";
function Infocard({ nameKr, nameEn, taste, abv, price, rating, onClick }) {
  const ratingStars = "★".repeat(rating) + "☆".repeat(5 - rating);
  // nameEn을 사용해 해당하는 이미지 찾기
  const image = whiskeyImages[nameEn];
  return (
    <div className={style.container}>
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
