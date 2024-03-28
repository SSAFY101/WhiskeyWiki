import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";

import style from "../css/Signup.module.css";

import progressIcon from "../images/step2.png";
import icon1 from "../images/step2_1.png";
import icon2 from "../images/step2_2.png";
import icon3 from "../images/step2_3.png";
import line from "../images/line.png";
import warningIcon from "../images/warning.png";

const Step2 = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");

  const [checkNickname, setCheckNickname] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkPwSame, setCheckPwSame] = useState(false);

  // 입력
  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 조건
  useEffect(() => {
    if (nickname.length > 1) {
      setCheckNickname(true);
    } else {
      setCheckNickname(false);
    }
  }, [nickname]);

  // 다음으로 버튼 클릭
  const clickNextButton = () => {
    dispatch(signupAction.pageThree());
  };

  return (
    <div className={`${style.step1Container}`}>
      <img src={progressIcon} className={`${style.progressImg}`} />
      <div className={`${style.inputContainer}`}>
        <img src={icon1} />
        <input
          placeholder="닉네임"
          value={nickname}
          onChange={changeNickname}
          spellCheck="false"
          maxLength="12"
          style={{
            border:
              nickname.length === 0
                ? ""
                : checkNickname
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <img
          src={warningIcon}
          style={{
            visibility:
              nickname.length === 0 ? "hidden" : checkNickname ? "hidden" : "",
          }}
        />
      </div>

      <div className={`${style.inputContainer}`}>
        <img src={icon2} />
        <input placeholder="생년월일" />
        <img src={warningIcon} />
      </div>

      <div className={`${style.inputContainer}`}>
        <img src={icon3} />
        <input placeholder="성별" />
        <img src={warningIcon} />
      </div>

      <img src={line} className={`${style.line}`} />

      <button
        className={`${style.nextButton}`}
        style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
        onClick={clickNextButton}
      >
        다음으로
      </button>

      {/* {(checkNickname && checkPw && checkPwSame) || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
        >
          다음으로
        </button>
      )} */}
    </div>
  );
};

export default Step2;
