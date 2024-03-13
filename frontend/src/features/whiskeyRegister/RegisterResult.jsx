import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../store/slices/register";

import RegistResCard from "./component/RegistResCard";

import style from "./css/RegisterResult.module.css";

const RegisterResult = () => {
  const dispatch = useDispatch();

  const whiskeyList = useSelector((state) => state.register.whiskeyList);

  const beforeClickHandler = () => {
    dispatch(registerAction.pageTwo());
  };

  const goMyBarHandler = () => {
    console.log("마이바 이동 버튼 클릭");
    // 라우트 추가
  };
  // className={`${style.}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>등록 완료</div>
      <div className={`${style.cardList}`}>
        {whiskeyList.map((whiskey) => (
          <div className={`${style.card}`}>
            <RegistResCard key={whiskey} nameEn={whiskey} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={beforeClickHandler} className={`${style.temp}`}>
          뒤로가기(임시)
        </button>
        <button onClick={goMyBarHandler} className={`${style.goMyBarButton}`}>
          마이바 보러가기
        </button>
      </div>
    </div>
  );
};

export default RegisterResult;
