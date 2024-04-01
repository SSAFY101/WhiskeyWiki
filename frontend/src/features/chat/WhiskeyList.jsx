// 다른 유저의 My Bar 조회
import { useEffect, useState } from "react";
import Whiskey from "./component/Whiskey";

import style from "./css/WhiskeyList.module.css";
import axios from "axios";

const WhiskeyList = ({ userId, userNickname }) => {
  const [whiskeyList, setWhiskeyList] = useState([
    { nameEn: "Absolut", nameKr: "앱솔루트" },
    { nameEn: "Jim-Beam", nameKr: "짐빔" },
    { nameEn: "Jack-Daniels", nameKr: "잭다니엘" },
    { nameEn: "Jagermeister", nameKr: "예거마이스터" },
    { nameEn: "Johnie-Walker", nameKr: "조니워커" },
  ]);

  useEffect(() => {
    // 위스키 목록 호출
    axios
      .get(`/mybar/${userId}`)
      .then((res) => {
        console.log("다른 유저의 My Bar 조회", res);

        const newWhiskeyList = res.data.data;
        setWhiskeyList(newWhiskeyList);
      })
      .catch((err) => {
        console.log("다른 유저의 My Bar 조회 실패", err);
      });
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>
        <span>{userNickname}</span>님의 술
      </div>
      <div className={`${style.whiskeyList}`}>
        {whiskeyList.map((whiskey) => (
          <Whiskey key={whiskey.nameEn} {...whiskey} />
        ))}
      </div>
    </div>
  );
};

export default WhiskeyList;
