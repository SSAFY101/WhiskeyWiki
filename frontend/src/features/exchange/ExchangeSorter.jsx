import { useCallback, useState } from "react";

// 위스키 목록 (테스트용)
const WhiskeyList = [
  "앱솔루트",
  "잭다니엘",
  "짐빔",
  "예거마이스터",
  "조니워커",
];

function Sorter() {
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    return;
  };

  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);

    console.log(value, e.target.checked);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );

  return (
    <>
      <h2>Find Whiskey</h2>

      <form onSubmit={onSubmit}>
        {/* 위스키 전체 선택 */}
        <div>
          <input type="checkbox" />
          <label>전체 선택</label>
        </div>

        {/* 구분선(임시) */}
        <p>---------------</p>

        {/* 개별 위스키 선택 */}
        <div className="checkbox-group">
          {WhiskeyList.map((item, idx) => (
            <div className="checkbox" key={idx}>
              <input
                type="checkbox"
                id={item}
                checked={checkedList.includes(item)}
                onChange={(e) => checkHandler(e, item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

        {/* 구분선(임시) */}
        <p>---------------</p>

        {/* 찾기 버튼 */}
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default Sorter;
