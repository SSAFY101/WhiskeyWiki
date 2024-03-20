import { createContext } from "react";

// 카테고리 목록 (테스트용)
const WhiskeyList = [
  {
    nameKr: "앱솔루트",
    nameEn: "Absolute",
    summery: "앱솔루트는 정말 맛있어요",
    // isOwn: true,
  },
  {
    nameKr: "잭다니엘",
    nameEn: "Jack-Daniels",
    summery: "잭다니엘은 정말 맛있어요",
    // isOwn: false,
  },
  {
    nameKr: "짐빔",
    nameEn: "Jim-Beam",
    summery: "짐빔은 정말 맛있어요",
    // isOwn: false,
  },
  {
    nameKr: "예거마이스터",
    nameEn: "Jagermeister",
    summery: "예거마이스터는 정말 맛있어요",
    // isOwn: false,
  },
  {
    nameKr: "조니워커",
    nameEn: "Johnie-Walker",
    summery: "조니워커는 정말 맛있어요",
    // isOwn: false,
  },
];

function Sorter() {
  // 데이터를 넣을 빈 배열
  // const [checkedList, setCheckedList] = useState([]);

  return (
    <>
      <h1>필터(체크박스)</h1>
      <p>전체 선택</p>
      <p>하나씩 작성</p>
    </>
  );
}

export default Sorter;
