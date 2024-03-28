import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import { registerAction } from "../../store/slices/register";
import DectectResCard from "./component/DectectResCard";

import style from "./css/DetectionResult.module.css";
import beforeIcon from "./images/before.png";
import nextIcon from "./images/next.png";
import { useNavigate } from "react-router-dom";

const DetectionResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickName = localStorage.getItem("nickName");
  const whiskeyList = useSelector((state) => state.register.whiskeyList);

  const [whiskeyInfoList, setWhiskeyList] = useState([]);

  useEffect(() => {
    // 인식 위스키 정보
    // axios
    //   .get("API 주소", whiskeyList, {
    //     headers: {
    //       accessToken: "토큰",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("인식 위스키 정보 : ", res);
    //     const data = res.data.data;
    //     setWhiskeyList(data);
    //   })
    //   .catch((err) => {
    //     console.log("인식 위스키 정보 ERROR : ", err);
    //   });
  }, []);

  // 테스트 -> whiskeyInfoList로 바꿔야 함
  const 테스트 = [
    {
      nameKr: "앱솔루트",
      nameEn: "Absolut",
      summery: "앱솔루트는 정말 맛있어요",
      isOwn: true,
    },
    {
      nameKr: "잭다니엘",
      nameEn: "Jack-Daniels",
      summery: "잭다니엘은 정말 맛있어요",
      isOwn: false,
    },
    {
      nameKr: "짐빔",
      nameEn: "Jim-Beam",
      summery: "짐빔은 정말 맛있어요",
      isOwn: false,
    },
    {
      nameKr: "예거마이스터",
      nameEn: "Jagermeister",
      summery: "예거마이스터는 정말 맛있어요",
      isOwn: false,
    },
    {
      nameKr: "조니워커",
      nameEn: "Johnie-Walker",
      summery: "조니워커는 정말 맛있어요",
      isOwn: false,
    },
  ];

  const size = 테스트.length; // 찾은 위스키 개수

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

    if (whiskeyList.length === 0) {
      alert("아무것도 안 넣으셔?");
      return;
    }

    console.log("등록할 위스키 리스트", whiskeyList);
    // axios
    //   .post("API 주소", whiskeyList, {
    //     headers: {
    //       accessToken: "토큰",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("My Bar 등록 : ", res);
    //   })
    //   .catch((err) => {
    //     console.log("My Bar 등록 ERROR : ", err);
    //   });

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
          {테스트.slice(startIdx, startIdx + 3).map((whiskey) => (
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
        <span>{whiskeyList.length}</span>개 선택
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
