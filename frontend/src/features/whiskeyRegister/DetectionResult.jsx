import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../auth/axiosInterceptor";

import { registerAction } from "../../store/slices/register";
import DectectResCard from "./component/DectectResCard";

import style from "./css/DetectionResult.module.css";
import beforeIcon from "./images/before.png";
import nextIcon from "./images/next.png";
import { useNavigate } from "react-router-dom";

const DetectionResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickName = useSelector((state) => state.user.nickName);
  const whiskeyReqList = useSelector((state) => state.register.whiskeyList);

  const [whiskeyInfoList, setWhiskeyList] = useState([]);

  useEffect(() => {
    console.log(whiskeyReqList);
    // 인식 위스키 정보
    instance
      .post(`/api/whiskey/info/detection`, { whiskeyReqList })
      .then((res) => {
        console.log("인식 위스키 정보 : ", res);
        const data = res.data.data;
        console.log(data.whiskeyResList);
        setWhiskeyList(data.whiskeyResList);
      })
      .catch((err) => {
        console.log("인식 위스키 정보 ERROR : ", err);
      });
  }, []);

  const size = whiskeyInfoList.length; // 찾은 위스키 개수

  // 보여줄 위스키 인덱싱
  const [startIdx, setStartIdx] = useState(0);

  const beforeClickHandler = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 3);
    }
  };

  const nextClickHandler = () => {
    if (startIdx + 3 < size) {
      setStartIdx(startIdx + 3);
    }
  };

  // 마이바에 위스키 저장

  const mybarSaveHandler = () => {
    if (!nickName) {
      if (window.confirm("로그인 필요합니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
      return;
    }

    if (whiskeyReqList.length === 0) {
      alert("아무것도 안 넣으셔?");
      return;
    }

    console.log("등록할 위스키 리스트", whiskeyReqList);
    instance
      .post(`/api/whiskey/ownwhiskey/register`, { whiskeyReqList })
      .then((res) => {
        console.log("My Bar 등록 : ", res);
      })
      .catch((err) => {
        console.log("My Bar 등록 ERROR : ", err);
      });

    dispatch(registerAction.pageThree());
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.whiskeyCount}`}>
        <span>{size}</span>개의 위스키를 찾았습니다.
      </div>
      <div className={`${style.cardListContainer}`}>
        <img
          onClick={beforeClickHandler}
          style={{ visibility: startIdx === 0 ? "hidden" : "" }}
          src={beforeIcon}
          className={`${style.cardListMoveButton}`}
        />
        <div className={`${style.cardList}`}>
          {whiskeyInfoList &&
            whiskeyInfoList.slice(startIdx, startIdx + 3).map((whiskey) => (
              <div className={`${style.card}`}>
                <DectectResCard key={whiskey.nameEn} {...whiskey} />
              </div>
            ))}
        </div>
        <img
          onClick={nextClickHandler}
          style={{ visibility: startIdx + 3 >= size ? "hidden" : "" }}
          src={nextIcon}
          className={`${style.cardListMoveButton}`}
        />
      </div>
      <div className={`${style.whiskeyCount}`}>
        <span>{whiskeyReqList.length}</span>개 선택
      </div>

      <button
        onClick={mybarSaveHandler}
        className={`${
          nickName ? style.mybarSaveButton : style.mybarSaveButtonDisabled
        }`}
      >
        마이바에 넣기
      </button>
    </div>
  );
};

export default DetectionResult;
