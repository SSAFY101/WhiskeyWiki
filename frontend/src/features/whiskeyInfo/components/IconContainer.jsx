import style from "./IconContainer.module.css";
import abvIcon from "../../../assets/icon/AlcoholContent.svg";
import flavorIcon from "../../../assets/icon/Flavor.svg";
import priceIcon from "../../../assets/icon/Price.svg";
function IconContainer({ abv, price, flavor }) {
  return (
    <div>
      <div className={style.iconContainer}>
        <div className={style.iconWrapper}>
          <img src={abvIcon} alt="" />
          <p>{abv}</p>
        </div>
        <div className={style.iconWrapper}>
          <img src={flavorIcon} alt="" />
          <p>{flavor}</p>
        </div>
        <div className={style.iconWrapper}>
          <img src={priceIcon} alt="" />
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}
export default IconContainer;
