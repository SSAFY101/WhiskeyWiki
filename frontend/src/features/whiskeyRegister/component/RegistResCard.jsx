import { WhiskeyImages } from "../images/WhiskeyImages";

import style from "../css/RegisterResult.module.css";

const RegistResCard = ({ nameEn }) => {
  const Whiskey = WhiskeyImages.find((it) => it.nameEn === nameEn);
  const imgUrl = Whiskey.imgUrl;

  const detailClickHandler = () => {
    console.log("상세 보기 이동 버튼 클릭");
    // 라우터 추가
  };
  // className={`${style.}`}
  return (
    <div className={`${style.cardContainer}`}>
      <img src={imgUrl} className={`${style.cardImg}`} />
      <div className={`${style.nameEn}`}>{nameEn}</div>
      <button onClick={detailClickHandler} className={`${style.detailButton}`}>
        상세 정보
      </button>
    </div>
  );
};

export default RegistResCard;
