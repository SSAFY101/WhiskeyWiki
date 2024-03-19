import style from "./IconContainer.module.css";
import alcoholContent from "../../../assets/icon/AlcoholContent.svg";
import flavor from "../../../assets/icon/Flavor.svg";
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
    </div>
  );
}
export default IconContainer;
