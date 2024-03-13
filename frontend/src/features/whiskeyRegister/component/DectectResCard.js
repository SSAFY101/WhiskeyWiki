import { useState } from "react";
import { WhiskeyImages } from "../images/WhiskeyImages";

const DectectResCard = ({ nameKr, nameEn, summery, isOwn }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const Whiskey = WhiskeyImages.find((it) => it.nameEn === nameEn);

  // console.log(Whiskey);

  const imgUrl = Whiskey.imgUrl;

  return (
    <div style={{ margin: "1rem" }}>
      <div>
        <img src={imgUrl} style={{ width: "10rem" }} />
      </div>
      <div>{nameEn}</div>
      <div>{nameKr}</div>
      <div onClick={toggleHandler}>더보기</div>
      {toggle && (
        <div>
          <div>{summery}</div>
        </div>
      )}
      {isOwn && <div>보유중</div>}
      {!isOwn && <div>쳌</div>}
    </div>
  );
};

export default DectectResCard;
