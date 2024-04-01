import { useEffect, useState } from "react";
import Whiskey from "./component/Whiskey";

import style from "./css/WhiskeyList.module.css";

const WhiskeyList = ({ userId }) => {
  const [whiskeyList, setWhiskeyList] = useState([
    { nameEn: "Absolut", nameKr: "앱솔루트" },
    { nameEn: "Jim-Beam", nameKr: "짐빔" },
    { nameEn: "Jack-Daniels", nameKr: "잭다니엘" },
    { nameEn: "Jagermeister", nameKr: "예거마이스터" },
    { nameEn: "Johnie-Walker", nameKr: "조니워커" },
  ]);

  useEffect(() => {
    // 위스키 목록 호출
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>
        <span>{userId}</span>님의 술
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
