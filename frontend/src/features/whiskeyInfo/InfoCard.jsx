import style from "./InfoCard.module.css";
import ballantinesImage from "../../assets/whiskey/Ballantines.png";
function Infocard({ onClick }) {
  return (
    <div className={style.outerCard} onClick={onClick}>
      <img src={ballantinesImage} alt="" />
      <div className={style.infoArea}>
        <h1>Absolut</h1>
        <h2>앱솔루트</h2>
        <h3>40도</h3>
        <h3>3만원대</h3>
        <div className={style.rating}>
          {'★★★★★' }
        </div>
      </div>
    </div>
  );
}

export default Infocard;
