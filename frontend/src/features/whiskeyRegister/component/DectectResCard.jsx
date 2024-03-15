import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../../store/slices/register";

import { WhiskeyImages } from "../images/WhiskeyImages";
import style from "../css/DetectionResult.module.css";

const DectectResCard = ({ nameKr, nameEn, summery, isOwn }) => {
  const dispatch = useDispatch();

  // 이미지 불러오기
  const Whiskey = WhiskeyImages.find((it) => it.nameEn === nameEn);
  const imgUrl = Whiskey.imgUrl;

  // 더보기 토글
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // 보유 중인 경우 처리
  const WhiskeyList = useSelector((state) => state.register.WhiskeyList);

  useEffect(() => {
    if (isOwn && WhiskeyList) {
      const newWhiskeyList = WhiskeyList.filter((item) => item !== nameEn);
      dispatch(registerAction.setWhiskeyList(newWhiskeyList));
    }
  }, []);

  // 체크박스
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    console.log(nameEn, " ", checked); // test

    if (WhiskeyList) {
      // 체크
      if (checked) {
        const newWhiskeyList = WhiskeyList.filter((item) => item !== nameEn);
        dispatch(registerAction.setWhiskeyList(newWhiskeyList));
      }
      // 체크 해제
      else {
        const newWhiskeyList = [...WhiskeyList, nameEn];
        dispatch(registerAction.setWhiskeyList(newWhiskeyList));
      }
    }
  }, [checked]);

  return (
    <div className={`${style.cardContainer}`}>
      <img src={imgUrl} className={`${style.cardImg}`} />

      <div className={`${style.cardNameEn}`}>{nameEn}</div>
      <div className={`${style.cardNameKr}`}>{nameKr}</div>
      {!toggle && (
        <div onClick={toggleHandler} className={`${style.cardToggleSummery}`}>
          설명 보기
        </div>
      )}
      {toggle && (
        <div className={`${style.summery}`}>
          <div className={`${style.summeryContent}`}>{summery}</div>
          <div onClick={toggleHandler} className={`${style.cardToggleSummery}`}>
            닫기
          </div>
        </div>
      )}
      {isOwn && <div className={`${style.have}`}>보유중</div>}
      {!isOwn && (
        <label className={`${style.checkBox}`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)}
          />
        </label>
      )}
    </div>
  );
};

export default DectectResCard;
