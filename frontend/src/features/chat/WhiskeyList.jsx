import Whiskey from "./component/Whiskey";

import style from "./css/WhiskeyList.module.css";

const WhiskeyList = ({ userId }) => {
  // userId가 가진 위스키 불러오기
  const 테스트 = [
    { nameEn: "Absolut", nameKr: "앱솔루트" },
    { nameEn: "Jim-Beam", nameKr: "짐빔" },
    { nameEn: "Jack-Daniels", nameKr: "잭다니엘" },
    { nameEn: "Jagermeister", nameKr: "예거마이스터" },
    { nameEn: "Johnie-Walker", nameKr: "조니워커" },
  ];

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>
        <span>{userId}</span>님의 술
      </div>
      <div className={`${style.whiskeyList}`}>
        {테스트.map((whiskey) => (
          <Whiskey key={whiskey.nameEn} {...whiskey} />
        ))}
      </div>
    </div>
  );
};

export default WhiskeyList;
