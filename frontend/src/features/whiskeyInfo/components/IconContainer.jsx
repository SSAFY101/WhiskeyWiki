import style from "./IconContainer.module.css";
import alcoholContent from "../../../assets/icon/AlcoholContent.svg";
import flavor from "../../../assets/icon/Flavor.svg";
import price from '../../../assets/icon/Price.svg'
function IconContainer() {
  return (
    <div className={style.iconContainer}>
      <div className={style.iconWrapper}>
        <img src={alcoholContent} alt="" />
        <p>40도</p>
      </div>
      <div className={style.iconWrapper}>
        <img src={flavor} alt="" />
        <p>복숭아 맛</p>
      </div>
      <div className={style.iconWrapper}>
        <img src={price} alt="" />
        <p>4만원대</p>
      </div>
    
    </div>
  );
}
export default IconContainer;
