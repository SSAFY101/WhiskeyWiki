import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { registerAction } from "../../store/slices/register";
import DectectResCard from "./component/DectectResCard";

const DetectionResult = () => {
  const dispatch = useDispatch();

  const whiskeyList = useSelector((state) => state.register.whiskeyList);

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
    //     // 받은 배열 -> 테스트 대체 배열로 처리
    //     // isOwn이 true인 경우, whiskeyList에서 삭제
    //   })
    //   .catch((err) => {
    //     console.log("인식 위스키 정보 ERROR : ", err);
    //   });
  }, []);

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
  ];

  const mybarSaveHandler = () => {
    console.log("My Bar 등록 핸들러");
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
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {테스트.map((whiskey) => (
          <div style={{ marginRight: "1rem" }}>
            <DectectResCard key={whiskey.nameEn} {...whiskey} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={mybarSaveHandler}>마이바에 저장</button>
      </div>
    </div>
  );
};

export default DetectionResult;
