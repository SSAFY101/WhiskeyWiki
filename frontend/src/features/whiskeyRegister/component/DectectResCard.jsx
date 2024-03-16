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
  // const [toggle, setToggle] = useState(false);

  // const toggleHandler = () => {
  //   setToggle(!toggle);
  // };

  const WhiskeyList = useSelector((state) => state.register.whiskeyList);

  useEffect(() => {
    if (!WhiskeyList) {
      return;
    }
    // 보유한 위스키 : 위스키 리스트(리덕스)에서 삭제
    if (isOwn) {
      console.log(nameEn);
      setChecked(false);
      const newWhiskeyList = WhiskeyList.filter((item) => item !== nameEn);
      dispatch(registerAction.setWhiskeyList(newWhiskeyList));
    }
    // 위스키 리스트에 없는 위스키 : 체크 해제
    else if (!WhiskeyList.includes(nameEn)) {
      setChecked(false);
    }
  }, []);

  // 체크박스
  const [checked, setChecked] = useState(true);

  const checkClickHandler = () => {
    if (checked) {
      // 제외
      const newWhiskeyList = WhiskeyList.filter((item) => item !== nameEn);
      dispatch(registerAction.setWhiskeyList(newWhiskeyList));
    } else {
      // 추가
      const newWhiskeyList = [...WhiskeyList, nameEn];
      dispatch(registerAction.setWhiskeyList(newWhiskeyList));
    }
    setChecked(!checked);
  };

  return (
    <div
      className={`${style.cardContainer}`}
      style={{ borderColor: checked ? "#eeb233" : "#767676" }}
    >
      <img src={imgUrl} className={`${style.cardImg}`} />

      <div className={`${style.cardNameEn}`}>{nameEn}</div>
      <div className={`${style.cardNameKr}`}>{nameKr}</div>

      {/* {!toggle && (
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
      )} */}
      {isOwn && <div className={`${style.have}`}>보유중</div>}
      {!isOwn && (
        <label className={`${style.checkBox}`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={checkClickHandler}
          />
        </label>
      )}
    </div>
  );
};

export default DectectResCard;
