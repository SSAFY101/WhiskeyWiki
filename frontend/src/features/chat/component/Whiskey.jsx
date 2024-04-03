import { WhiskeyImages } from "../images/WhiskeyImages";

import style from "../css/Whiskey.module.css";

const Whiskey = ({ WhiskeyNameEn, whiskeyNameKr }) => {
  // 이미지 불러오기
  const Whiskey = WhiskeyImages.find((it) => it.nameEn === WhiskeyNameEn);
  const imgUrl = Whiskey.imgUrl;

  return (
    <div className={`${style.container}`}>
      <img src={imgUrl} />
      <div className={`${style.name}`}>{whiskeyNameKr}</div>
    </div>
  );
};

export default Whiskey;
