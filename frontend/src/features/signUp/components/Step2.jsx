import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const [gender, setGender] = useState("");

  const [checkNickname, setCheckNickname] = useState(false);

  const regex = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]+$/;

  // 입력
  const changeNickname = (e) => {
    const value = e.target.value.replace(regex, "");
    console.log(value);
    setNickname(value);
  };

  // 조건
  const checkValid = () => {
    // 닉네임 중복 검사
    axios
      .post("/api/users/valid/nickname", {
        nickName: nickname,
      })
      .then((res) => {
        console.log("닉네임 중복 검사", res);
      })
      .catch((err) => {
        console.log("닉네임 중복 검사 실패", err);
      });
  };

  useEffect(() => {
    const isKorean = /^[가-힣]+$/;
    const isEnglish = /^[a-zA-Z]+$/;

    // 한글 닉네임
    if (nickname.length > 1 && isKorean.test(nickname)) {
      setCheckNickname(true);
      // 영어 닉네임
    } else if (nickname.length > 3 && isEnglish.test(nickname)) {
      setCheckNickname(true);
    } else {
      setCheckNickname(false);
    }
  }, [nickname]);

  // 성별 선택
  const setGenderMale = () => {
    setGender("남성");
  };

  const setGenderFemale = () => {
    setGender("여성");
  };

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
          onBlur={checkValid}
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

      {/* 생년월일 */}
      <div className={`${style.inputContainer}`}>
        <img src={icon2} />
        <input placeholder="생년월일" disabled />
        <img
          src={warningIcon}
          style={{
            visibility: "hidden",
          }}
        />
      </div>

      {/* 성별 */}
      <div className={`${style.inputContainer}`}>
        <img src={icon3} />
        <div
          className={`${style.genderChoice}`}
          onClick={setGenderMale}
          style={{
            color:
              gender === ""
                ? "#828282"
                : gender === "남성"
                ? "#262626"
                : "#828282",
            backgroundColor:
              gender === ""
                ? "#343434"
                : gender === "남성"
                ? "#28B280"
                : "#343434",
          }}
        >
          남자
        </div>
        <div
          className={`${style.genderChoice}`}
          onClick={setGenderFemale}
          style={{
            marginRight: "4rem",
            color:
              gender === ""
                ? "#828282"
                : gender === "여성"
                ? "#262626"
                : "#828282",
            backgroundColor:
              gender === ""
                ? "#343434"
                : gender === "여성"
                ? "#28B280"
                : "#343434",
          }}
        >
          여자
        </div>
      </div>

      <img src={line} className={`${style.line}`} />

      {checkNickname && (
        <button
          className={`${style.nextButton}`}
          style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
          onClick={clickNextButton}
        >
          다음으로
        </button>
      )}

      {checkNickname || (
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
      )}
    </div>
  );
};

export default Step2;
