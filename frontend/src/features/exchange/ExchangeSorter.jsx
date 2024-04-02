import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { exchangeAction } from "../../store/slices/exchange";
import { whiskeyList, whiskeyEnList } from "./ExchangeSorterWhiskeyList";
import style from "./ExchangeSorter.module.css";

function Sorter() {
  const [checkedWhiskeyList, setCheckedWhiskeyList] = useState([]); // 체크된 항목 목록
  const [isChecked, setIsChecked] = useState(false); // 선택 여부

  // 컴포넌트가 처음 렌더링될 때, 전체 선택 (checkAllHandler를 호출)
  useEffect(() => {
    checkAllHandler();
  }, []);

  // 4. Redux 활용 => checkedWhiskeyList 내용을 다른 컴포넌트에 넘겨주기
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exchangeAction.setCheckedWhiskeyList(checkedWhiskeyList));
  }, [checkedWhiskeyList]);

  // 1-2. 체크된 항목을 핸들링하는 함수
  const checkedwhiskeyHandler = (value, isChecked) => {
    // 체크박스 체크가 true이면, => 이전의 checkedWhiskeyList 배열에 새로운 value 추가해서 업데이트
    if (isChecked) {
      setCheckedWhiskeyList((prev) => [...prev, value]);
      return;
    }
    // 체크박스 체크가 false && checkedWhiskeyList에 value가 포함되어 있으면,
    // => checkedWhiskeyList에서 해당 value를 제외한 새로운 배열로 업데이트
    if (!isChecked && checkedWhiskeyList.includes(value)) {
      setCheckedWhiskeyList(
        checkedWhiskeyList.filter((whiskey) => whiskey !== value)
      );
      return;
    }

    // 함수 실행 종료
    return;
  };

  // 1-1. 체크박스의 상태 변경을 핸들링하는 함수 (true, false)
  const checkHandler = (e, value) => {
    // setIsChecked(!isChecked); // isChecked 상태를 토글해서 체크박스의 전체 선택 여부 업데이트
    checkedwhiskeyHandler(value, e.target.checked); // 함수 호출 => 체크된 항목 처리

    if (checkedWhiskeyList.length === whiskeyList.length + 1) {
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
      const allChecked = whiskeyList.slice(); // 현재 위스키 리스트를 복제하여 새 배열 생성
      setCheckedWhiskeyList(allChecked); // 모든 위스키를 선택 상태로 설정
      setIsChecked(true); // 전체 선택 체크박스의 상태를 true로 설정
    } else {
      // 모든 위스키 선택 해제
      setCheckedWhiskeyList([]);
      setIsChecked(false); // 전체 선택 체크박스의 상태를 false로 설정
    }
  };

  // 3. '제출(submit)' 버튼
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // click하는 순간, 새로고침 X (이벤트의 기본 동작 방지)
      // console.log("checkedWhiskeyList:", checkedWhiskeyList); // checkedWhiskeyList 배열 출력
      window.location.reload(); // 제출 버튼을 누르면 페이지를 새로고침
    },
    [checkedWhiskeyList] // 의존성 배열에 checkedWhiskeyList를 지정 => checkedWhiskeyList가 변경될 때마다 함수 재성생
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="checkbox-group">
          {/* 위스키 전체 선택 */}
          <div className={style.checkbox}>
            <input
              type="checkbox"
              id="all"
              checked={isChecked}
              onChange={checkAllHandler}
            />
            <label className={style.nameKr} htmlFor="all">
              전체 선택
            </label>
          </div>

          {/* 구분선 */}
          <hr className={style.line} />

          {/* 개별 위스키 선택 => whiskeyList 순회하면서, 각 항목 화면에 표시 */}
          <div className={style.listbox}>
            {whiskeyList.map((whiskey, idx) => (
              <div className={style.checkbox} key={idx}>
                {/* input 요소 렌더링 */}
                <input
                  type="checkbox"
                  id={whiskey}
                  checked={checkedWhiskeyList.includes(whiskey)}
                  onChange={(e) => checkHandler(e, whiskey)}
                />
                {/* 라벨 요소 렌더링 => 체크박스 옆에 항목 이름 표시 */}
                {/* 1) 한글이름 */}
                <label className={style.nameKr} htmlFor={whiskey}>
                  {whiskey}
                </label>
                <br />
                {/* 2) 영어이름 */}
                <label className={style.nameEn} htmlFor={whiskey}>
                  {whiskeyEnList[idx]}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <hr className={style.line} />

        {/* 찾기 버튼 */}
        <button className={style.searchButton} type="submit">
          My Bar 검색
        </button>
      </form>
    </>
  );
}

export default Sorter;
