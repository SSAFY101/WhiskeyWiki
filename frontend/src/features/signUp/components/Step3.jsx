import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";

import style from "../css/Signup.module.css";

import progressIcon from "../images/step3.png";
import icon1 from "../images/step3_1.png";
import icon2 from "../images/step3_2.png";
import line from "../images/line.png";
import warningIcon from "../images/warning.png";

const Step3 = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");

  const [checkNickname, setCheckNickname] = useState(false);
  const [checkPw, setCheckPw] = useState(false);

  const clickSignup = () => {};

  return (
    <div className={`${style.step1Container}`}>
      <img src={progressIcon} className={`${style.progressImg}`} />
      <div className={`${style.inputContainer}`}>
        <img src={icon1} />
        <input
          className={`${style.addressInput}`}
          placeholder="우편번호"
          value={nickname}
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
        <button>검색</button>
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
        <input placeholder="주소" />
        <img src={warningIcon} />
      </div>

      <img src={line} className={`${style.line}`} />

      <button
        className={`${style.nextButton}`}
        style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
        onClick={clickSignup}
      >
        가입하기
      </button>

      {/* {(checkNickname && checkPw) || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
        >
          가입하기
        </button>
      )} */}
    </div>
  );
};

export default Step3;
