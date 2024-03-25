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
  const [checkedList, setCheckedList] = useState([]); // 체크된 항목 목록
  const [isChecked, setIsChecked] = useState(false); // 선택 여부

  // 1-2. 체크된 항목을 핸들링하는 함수
  const checkedwhiskeyHandler = (value, isChecked) => {
    // 체크박스 체크가 true이면, => 이전의 checkedList 배열에 새로운 value 추가해서 업데이트
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    // 체크박스 체크가 false && checkedList에 value가 포함되어 있으면,
    // => checkedList에서 해당 value를 제외한 새로운 배열로 업데이트
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((whiskey) => whiskey !== value));
      return;
    }

    // 함수 실행 종료
    return;
  };

  // 1-1. 체크박스의 상태 변경을 핸들링하는 함수 (true, false)
  const checkHandler = (e, value) => {
    // setIsChecked(!isChecked); // isChecked 상태를 토글해서 체크박스의 전체 선택 여부 업데이트
    checkedwhiskeyHandler(value, e.target.checked); // 함수 호출 => 체크된 항목 처리

    if (checkedList.length === WhiskeyList.length + 1) {
      setIsChecked(true); // 모든 항목이 선택되었으면 전체 선택 체크박스를 체크 상태로 설정
    } else {
      setIsChecked(false); // 그렇지 않으면 전체 선택 체크박스를 체크 해제 상태로 설정
    }

    console.log(value, e.target.checked); // isChecked 상태 출력 (true or false)
  };

  // 2. 체크박스 전체를 선택하는 함수
  const checkAllHandler = () => {
    // 전체 선택
    if (!isChecked) {
      const allChecked = WhiskeyList.slice(); // 현재 위스키 리스트를 복제하여 새 배열 생성
      setCheckedList(allChecked); // 모든 위스키를 선택 상태로 설정
      setIsChecked(true); // 전체 선택 체크박스의 상태를 true로 설정
    } else {
      // 모든 위스키 선택 해제
      setCheckedList([]);
      setIsChecked(false); // 전체 선택 체크박스의 상태를 false로 설정
    }
  };

  // 3. '제출(submit)' 버튼
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // click하는 순간, 새로고침 X (이벤트의 기본 동작 방지)

      console.log("checkedList:", checkedList); // checkedList 배열 출력
    },
    [checkedList] // 의존성 배열에 checkedList를 지정 => checkedList가 변경될 때마다 함수 재성생
  );

  return (
    <>
      {/* <h2>Find Whiskey</h2> */}

      <form onSubmit={onSubmit}>
        <div className="checkbox-group">
          {/* 위스키 전체 선택 */}
          <div className="checkbox">
            <input
              type="checkbox"
              id="all"
              checked={isChecked}
              onChange={checkAllHandler}
            />
            <label htmlFor="all">전체 선택</label>
          </div>

          {/* 구분선(임시) */}
          <p>---------------</p>

          {/* 개별 위스키 선택 => WhiskeyList 순회하면서, 각 항목 화면에 표시 */}
          {WhiskeyList.map((whiskey, idx) => (
            <div className="checkbox" key={idx}>
              {/* input 요소 렌더링 */}
              <input
                type="checkbox"
                id={whiskey}
                checked={checkedList.includes(whiskey)}
                onChange={(e) => checkHandler(e, whiskey)}
              />
              {/* 라벨 요소 렌더링 => 체크박스 옆에 항목 이름 표시 */}
              <label htmlFor={whiskey}>{whiskey}</label>
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
