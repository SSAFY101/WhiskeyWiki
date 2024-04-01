import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../store/slices/register";

import RegistResCard from "./component/RegistResCard";

import style from "./css/RegisterResult.module.css";
import { useNavigate } from "react-router-dom";

const RegisterResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const whiskeyList = useSelector((state) => state.register.whiskeyList);

  const goMyBarHandler = () => {
    navigate("/myBar");
  };

  const devidedList = [];
  for (let i = 0; i < whiskeyList.length; i += 3) {
    devidedList.push(whiskeyList.slice(i, i + 3));
  }

  console.log(devidedList);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>등록이 완료되었습니다.</div>
      <button onClick={goMyBarHandler} className={`${style.goMyBarButton}`}>
        마이바 보러가기
      </button>
      <div className={`${style.detailContainer}`}>
        <div className={`${style.detailTitle}`}>자세히 알아보기</div>
        <div className={`${style.cardList}`}>
          {devidedList.map((whiskeyGroup, idx) => (
            <div key={idx} className={`${style.whiskeyGroup}`}>
              {whiskeyGroup.map((whiskey) => (
                <div className={`${style.card}`}>
                  <RegistResCard key={whiskey} nameEn={whiskey} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterResult;
