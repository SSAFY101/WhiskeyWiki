import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";
import axios from "axios";
import ReactCalendar from "./Calendar";

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
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);

  const [openCalendar, setOpenCalendar] = useState(false);

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

  // 생년월일 입력
  const changeYear = (e) => {
    const year = e.target.value;
    if (year > 2024) {
      setYear(2024);
    } else if (year < 1) {
      setYear(null);
    } else {
      setYear(year);
    }
  };

  const changeMonth = (e) => {
    const month = e.target.value;
    if (month > 12) {
      setMonth(12);
    } else if (month < 1) {
      setMonth(null);
    } else {
      setMonth(month);
    }
  };

  const changeDay = (e) => {
    const day = e.target.value;
    if (day > 31) {
      setDay(31);
    } else if (day < 1) {
      setDay(null);
    } else {
      setDay(day);
    }
  };

  // 나이 계산
  const date = new Date();
  const nowYear = date.getFullYear();

  useEffect(() => {
    if (year >= 1 && month >= 1 && day >= 1) {
      const yo = nowYear - year;
      if (yo >= 20) {
        if (year < 1919) {
          setAge(0);
        } else {
          setAge(yo);
        }
      } else {
        setAge(0);
      }
    } else {
      setAge(0);
    }
  }, [year, month, day]);

  // 성별 선택
  const setGenderMale = () => {
    setGender("남성");
  };

  const setGenderFemale = () => {
    setGender("여성");
  };

  // 다음으로 버튼 클릭
  const clickNextButton = () => {
    dispatch(signupAction.stepTwo(nickname, age, gender));
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
        {/* 년 */}
        <input
          type="number"
          value={year}
          onChange={changeYear}
          placeholder="1996"
          className={`${style.yearInput}`}
          style={{
            border:
              year === null
                ? ""
                : age > 0
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <div className={`${style.BDtext}`}>년</div>
        {/* 월 */}
        <input
          type="number"
          value={month}
          onChange={changeMonth}
          placeholder="12"
          className={`${style.monthInput}`}
          style={{
            border:
              month === null
                ? ""
                : age > 0
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <div className={`${style.BDtext}`}>월</div>
        {/* 일 */}
        <input
          type="number"
          value={day}
          onChange={changeDay}
          placeholder="25"
          className={`${style.monthInput}`}
          style={{
            border:
              day === null
                ? ""
                : age > 0
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <div className={`${style.BDtext}`}>일</div>
        {/* 경고 */}
        <img
          src={warningIcon}
          style={{
            visibility:
              day === null && month === null && year === null
                ? "hidden"
                : age > 0
                ? "hidden"
                : "",
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

      {checkNickname && age > 0 && gender !== "" && (
        <button
          className={`${style.nextButton}`}
          style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
          onClick={clickNextButton}
        >
          다음으로
        </button>
      )}

      {(checkNickname && age > 0 && gender !== "") || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
          disabled
        >
          다음으로
        </button>
      )}
    </div>
  );
};

export default Step2;
