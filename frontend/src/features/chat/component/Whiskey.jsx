import { WhiskeyImages } from "../images/WhiskeyImages";

import style from "../css/Whiskey.module.css";

const Whiskey = ({ nameEn, nameKr }) => {
  // 이미지 불러오기
  const Whiskey = WhiskeyImages.find((it) => it.nameEn === nameEn);
  const imgUrl = Whiskey.imgUrl;

  return (
    <div className={`${style.container}`}>
      <img src={imgUrl} />
      <div className={`${style.name}`}>{nameKr}</div>
    </div>
  );
};

export default Whiskey;
